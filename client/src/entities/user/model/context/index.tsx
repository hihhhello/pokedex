import { AxiosError } from 'axios';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { githubApi, User, githubPokedexApi } from 'shared/api';
import { GITHUB_TOKEN_KEY, GITHUB_USER_LOGIN_KEY } from 'shared/lib';
import { IUserContext } from './types';

import { parseAxiosError } from 'shared/lib';

export const initialValues: IUserContext = {
  user: null,
  loading: false,
  authorizing: true,
  error: null,
  getFavPokemons: async () => [],
  login: async (code: string) => {},
  logout: () => {},
};

export const UserContext = createContext(initialValues);
export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [authorizing, setAuthorizing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initialize = async () => {
    try {
      let token = localStorage.getItem(GITHUB_TOKEN_KEY);
      let login = localStorage.getItem(GITHUB_USER_LOGIN_KEY);
      if (token && login) {
        const parsedLogin = JSON.parse(login);
        const response = await githubPokedexApi.checkUser(parsedLogin);
        setUser(response.data);
      }
    } catch (e: any) {
      if (e instanceof AxiosError) {
        const { statusText, message } = parseAxiosError(e);

        toast(message || statusText, {
          type: 'error',
        });

        setError(message || statusText);

        return;
      }

      setError(e.message);

      toast(e.message, {
        type: 'error',
      });
    } finally {
      setAuthorizing(false);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const login = useCallback(async (code: string) => {
    try {
      setLoading(true);
      const { data } = await githubPokedexApi.getAccessToken(code);

      localStorage.setItem(GITHUB_TOKEN_KEY, JSON.stringify(data.access_token));
      // Retreive githubUser
      const { data: githubUser } = await githubApi.getUser();

      localStorage.setItem(
        GITHUB_USER_LOGIN_KEY,
        JSON.stringify(githubUser.login)
      );

      try {
        // Check if user exists in the local db
        const response = await githubPokedexApi.checkUser(githubUser.login);
        setUser(response.data);
      } catch (e: any) {
        // If getting 404 status - creating new user otherwise handle an error
        if (e instanceof AxiosError) {
          const { status, statusText, message } = parseAxiosError(e);

          if (status === 404) {
            const createUserResponse = await githubPokedexApi.createNewUser({
              ...githubUser,
              githubId: githubUser.id,
              githubHtmlUrl: githubUser.html_url,
              avatarUrl: githubUser.avatar_url,
            });

            setUser(createUserResponse.data);
            return;
          }

          setError(message || statusText);

          toast(message || statusText, {
            type: 'error',
          });
          return;
        }

        setError(e.message);

        toast(e.message, {
          type: 'error',
        });
      }
    } catch (e: any) {
      if (e instanceof AxiosError) {
        const { statusText, message } = parseAxiosError(e);

        toast(message || statusText, {
          type: 'error',
        });

        setError(message || statusText);

        return;
      }

      setError(e.message);

      toast(e.message, {
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(GITHUB_TOKEN_KEY);
    localStorage.removeItem(GITHUB_USER_LOGIN_KEY);
  }, []);

  const getFavPokemons = useCallback(async () => [], []);

  const values: IUserContext = useMemo(
    () => ({
      user,
      loading,
      error,
      getFavPokemons,
      login,
      logout,
      authorizing,
    }),
    [error, getFavPokemons, loading, login, logout, user, authorizing]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
