import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { githubPokedexApi, PaginationOptions } from 'shared/api';
import { AddPokRatingDto } from 'shared/api/github-pokedex/pok-ratings/types';
import { handleToastError, parseAxiosError } from 'shared/lib';

export const fetchPokemonRatings = async (
  pokemonId: number,
  pagination?: PaginationOptions
) => {
  try {
    const { data } = await githubPokedexApi.getPokRatingsList(
      pokemonId,
      pagination
    );

    return data;
  } catch (e: any) {
    // If getting 404 status - just skip, because pokemon might be not in db yet
    if (e instanceof AxiosError) {
      const { status, statusText, message } = parseAxiosError(e);

      if (status === 404) {
        return null;
      }

      toast(message || statusText, {
        type: 'error',
      });

      return;
    }

    toast(e.message, {
      type: 'error',
    });
  }
};

export const addPokemonRating = async (data: AddPokRatingDto) => {
  try {
    const { data: returnData } = await githubPokedexApi.addPokRating(data);
    return returnData;
  } catch (e: any) {
    handleToastError(e);
  }
};

export const deletePokemonRating = async (reviewId: number) => {
  try {
    const { data: returnData } = await githubPokedexApi.deletPokRating(
      reviewId
    );
    return returnData;
  } catch (e: any) {
    handleToastError(e);
  }
};
