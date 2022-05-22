import { FavPokemon } from '../types';
import { User } from './models';

export type UserFavPokemon = {
  id: number;
  favPokemon: FavPokemon;
};

export interface FavPokemonsReturnData {
  count: number;
  next: null | string;
  previous: null | string;
  results: UserFavPokemon[];
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
