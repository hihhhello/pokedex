import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { githubPokedexApi, PaginationOptions } from 'shared/api';
import { parseAxiosError } from 'shared/lib';

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
