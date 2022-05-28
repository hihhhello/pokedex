import { FavouritePokemon } from './favourite-pokemons';
import { User, UserToFavPokemon } from './users';
import { PokRating, PokStats } from './pok-ratings';

export const entities = [
  User,
  FavouritePokemon,
  UserToFavPokemon,
  PokRating,
  PokStats,
];

export * from './middlewares';
export { router } from './routing';
