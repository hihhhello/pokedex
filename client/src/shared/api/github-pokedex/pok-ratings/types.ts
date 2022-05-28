import { AddFavPokemonDto, PaginatedReturndData } from '../types';
import { PokRating } from './models';

export interface AddPokRatingDto {
  pokemon: AddFavPokemonDto;
  rating: number;
  text: string;
  user: {
    id: number;
  };
}

export interface EditPokRatingDto {
  rating?: number;
  text?: string;
}

export type PaginatedPokRatings = PaginatedReturndData<PokRating>;
