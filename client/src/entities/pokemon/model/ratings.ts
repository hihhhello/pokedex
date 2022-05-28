import { githubPokedexApi, PaginationOptions } from 'shared/api';
import { handleToastError } from 'shared/lib';

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
    handleToastError(
      e,
      'Something gone wrong while fetching pokemon ratings. Refresh the page and try again.'
    );
  }
};
