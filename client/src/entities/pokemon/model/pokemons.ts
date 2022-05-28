import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { FavPokemon, githubPokedexApi } from 'shared/api';
import { parseAxiosError } from 'shared/lib';

export const fetchOnePokemon = async (
  pokemonId: number
): Promise<FavPokemon | null | undefined> => {
  try {
    const { data } = await githubPokedexApi.getOnePokemon(pokemonId);

    return data;
  } catch (e: any) {
    // If getting 404 status - creating new user otherwise handle an error
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
