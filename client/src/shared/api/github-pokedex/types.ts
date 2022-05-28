import { User, UserFavPokemon } from './models';

export type FavPokemonsReturnData = PaginatedReturndData<UserFavPokemon>;

export interface PaginatedReturndData<T> {
  count: number;
  next: null | string;
  previous: null | string;
  results: T[];
}

export interface AddFavPokemonDto {
  apiId: number;
  avatarUrl?: string | null;
  name: string;
}

export type CreateUserDto = Omit<User, 'id' | 'createdAt'>;

export interface LoginDataResponse {
  access_token: string;
  scope: string;
  token_type: string;
}
