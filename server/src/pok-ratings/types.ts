import { BaseEntity } from 'typeorm';
import { AddFavPokemonDto } from '../favourite-pokemons';
import { PokRating } from './entities';

export type AddPokRatingDto = Pick<
  PokRating,
  Exclude<keyof PokRating, keyof BaseEntity | 'id' | 'createdAt' | 'favPokemon'>
> & {
  pokemon: AddFavPokemonDto;
};

export type EditPokRatingDto = Pick<
  PokRating,
  Exclude<
    keyof PokRating,
    keyof BaseEntity | 'id' | 'favPokemon' | 'user' | 'createdAt'
  >
>;
