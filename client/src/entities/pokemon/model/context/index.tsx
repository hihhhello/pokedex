import {
  createContext,
  PropsWithChildren,
  useState,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import { toast } from 'react-toastify';
import { IPokemonContext } from './types';
import { githubPokedexApi } from 'shared/api';

import { userModel } from 'entities/user';
import { useEffect } from 'react';
import { rowsPerPageOptions } from 'entities/pokemon/lib';

export const initialValues: IPokemonContext = {
  loading: false,
  favPokemonsApiIds: [],
  fetchFavPokemonsApiIds: async (userId: number) => {},
  page: 0,
  setPage: () => {},
  rowsPerPage: rowsPerPageOptions[0],
  setRowsPerPage: () => {},
  totalCount: 0,
  setTotalCount: () => {},
};

export const PokemonContext = createContext(initialValues);

export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [loading, setLoading] = useState(false);
  const [favPokemonsApiIds, setFavPokemonsApiIds] = useState<number[]>([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [totalCount, setTotalCount] = useState(0);

  const fetchFavPokemonsApiIds = useCallback(async (userId: number) => {
    try {
      setLoading(true);

      const { data } = await githubPokedexApi.getFavPokemonApiIds(userId);
      setFavPokemonsApiIds(data);
    } catch (e: any) {
      toast(e.message, {
        type: 'error',
        toastId: 'fetch-fav-ids-error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const { user } = userModel.context.useUserContext();

  useEffect(() => {
    if (user) {
      fetchFavPokemonsApiIds(user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const values: IPokemonContext = useMemo(
    () => ({
      loading,
      favPokemonsApiIds,
      fetchFavPokemonsApiIds,
      page,
      setPage,
      rowsPerPage,
      setRowsPerPage,
      totalCount,
      setTotalCount,
    }),
    [
      loading,
      favPokemonsApiIds,
      fetchFavPokemonsApiIds,
      page,
      rowsPerPage,
      totalCount,
    ]
  );

  return (
    <PokemonContext.Provider value={values}>{children}</PokemonContext.Provider>
  );
};
