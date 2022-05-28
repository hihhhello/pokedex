import { AxiosPromise } from 'axios';
import { apiInstance } from '../base';
import { FavPokemon } from '../models';

const BASE_URL = '/fav-pokemons';

export const getOnePokemon = (pokemonId: number): AxiosPromise<FavPokemon> => {
  return apiInstance.get(`${BASE_URL}/${pokemonId}`);
};

export const getOnePokemonByApiId = (
  apiId: number
): AxiosPromise<FavPokemon> => {
  return apiInstance.get(`${BASE_URL}/apiId/${apiId}`);
};
