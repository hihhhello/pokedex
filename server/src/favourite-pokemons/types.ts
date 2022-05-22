import { BaseEntity } from 'typeorm';
import { FavouritePokemon } from './entities';

export type AddFavPokemonDto = Pick<
  FavouritePokemon,
  Exclude<
    keyof FavouritePokemon,
    keyof BaseEntity | 'id' | 'createdAt' | 'userToFavPokemons'
  >
>;
