import { FavouritePokemon } from './favourite-pokemons';
import { User, UserToFavPokemon } from './users';

export const entities = [User, FavouritePokemon, UserToFavPokemon];

export * from './middlewares';
export { router } from './routing';
