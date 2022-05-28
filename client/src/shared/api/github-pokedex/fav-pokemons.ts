import { AxiosPromise } from 'axios';
import { PaginationOptions } from '../types';
import { apiInstance } from './base';
import { AddFavPokemonDto, FavPokemonsReturnData } from './types';

const BASE_URL = '/fav-pokemons';

// TODO: refactor to pokemon dir

export const getFavPokemons = (
  userId: number,
  pagination?: PaginationOptions
): AxiosPromise<FavPokemonsReturnData> => {
  return apiInstance.get(`${BASE_URL}/user/${userId}`, { params: pagination });
};

export const addFavPokemon = (userId: number, data: AddFavPokemonDto) => {
  return apiInstance.post(`${BASE_URL}/user/${userId}`, data);
};

export const deleteFavPokemon = (userId: number, pokApiId: number) => {
  return apiInstance.delete(`${BASE_URL}/user/${userId}/${pokApiId}`);
};

export const getFavPokemonApiIds = (userId: number): AxiosPromise<number[]> => {
  return apiInstance.get(`${BASE_URL}/user/${userId}/apiIds`);
};
