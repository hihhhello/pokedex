import { AxiosPromise } from 'axios';
import { PaginationOptions, PokRating } from 'shared/api';
import { apiInstance } from '../base';
import {
  AddPokRatingDto,
  EditPokRatingDto,
  PaginatedPokRatings,
} from './types';

const BASE_URL = '/pok-ratings';

export const addPokRating = (dto: AddPokRatingDto): AxiosPromise<PokRating> => {
  return apiInstance.post(BASE_URL, dto);
};

export const deletPokRating = (reviewId: number): AxiosPromise<PokRating> => {
  return apiInstance.delete(`${BASE_URL}/${reviewId}`);
};

export const editPokRating = (
  reviewId: number,
  dto: EditPokRatingDto
): AxiosPromise<PokRating> => {
  return apiInstance.patch(`${BASE_URL}/pokemon/${reviewId}`, dto);
};

export const getPokRatingsList = (
  pokemonId: number,
  pagination?: PaginationOptions
): AxiosPromise<PaginatedPokRatings> => {
  return apiInstance.get(`${BASE_URL}/pokemon/${pokemonId}`, {
    params: pagination,
  });
};
