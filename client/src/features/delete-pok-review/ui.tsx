import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { pokemonModel } from 'entities/pokemon';
import { toast } from 'react-toastify';

interface Props {
  reviewId: number;
  fetchRatings: (pokemonId: number) => Promise<void>;
  fetchPokemon: (apiId: number) => Promise<void>;
}

export const DeletePokReview = (props: Props) => {
  const { fetchPokemon, fetchRatings, reviewId } = props;

  const deleteReview = async () => {
    const data = await pokemonModel.deletePokemonRating(reviewId);
    if (data) {
      await fetchPokemon(data.favPokemon.apiId);
      await fetchRatings(data.favPokemon.id);
      toast('Review was deleted', {
        type: 'success',
        toastId: 'delete-pok-review',
      });
    }
  };

  return (
    <IconButton onClick={deleteReview}>
      <Delete />
    </IconButton>
  );
};
