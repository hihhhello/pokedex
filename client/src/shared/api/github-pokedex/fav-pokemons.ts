import { AxiosPromise } from 'axios';
import { PaginationOptions } from '../types';
import { apiInstance } from './base';
import { AddFavPokemonDto, FavPokemonsReturnData } from './types';

const BASE_URL = '/fav-pokemons';

export const getFavPokemons = (
  userId: number,
  pagination?: PaginationOptions
): AxiosPromise<FavPokemonsReturnData> => {
  return apiInstance.get(`${BASE_URL}/${userId}`, { params: pagination });
};

export const addFavPokemon = (userId: number, data: AddFavPokemonDto) => {
  return apiInstance.post(`${BASE_URL}/${userId}`, data);
};

export const deleteFavPokemon = (userId: number, pokApiId: number) => {
  return apiInstance.delete(`${BASE_URL}/${userId}/${pokApiId}`);
};

export const getFavPokemonApiIds = (userId: number): AxiosPromise<number[]> => {
  return apiInstance.get(`${BASE_URL}/${userId}/apiIds`);
};
