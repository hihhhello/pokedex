import { FavPokemon, PaginationOptions, User } from 'shared/api';

export interface IUserContext {
  user: User | null;
  loading: boolean;
  error: string | null;
  authorizing: boolean;
  login: (code: string) => Promise<void>;
  logout: () => void;
  getFavPokemons: (pagination?: PaginationOptions) => Promise<FavPokemon[]>;
}
