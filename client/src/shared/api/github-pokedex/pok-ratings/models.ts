import { FavPokemon, User } from '../models';

export interface StarRating {
  count: number;
  value: number;
}

export interface PokRating {
  id: number;
  user: User;
  favPokemon: FavPokemon;
  text: string;
  rating: number;
  createdAt: string;
}

export interface PokStats {
  id: number;
  pokemon?: FavPokemon;
  starsRatings: Record<number, StarRating>;
  totalReviews: number;
  average: number;
}
