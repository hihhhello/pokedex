import { Rating, TextField, Box, Button, SxProps } from '@mui/material';
import { pokemonModel } from 'entities/pokemon';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { AddFavPokemonDto } from 'shared/api';

// TODO: refactor add --> fetch flow with redux or another context if needed
// For a showcase fetch functions in props is enough

interface Props {
  userId: number;
  pokemon: AddFavPokemonDto;
  fetchRatings: (pokemonId: number) => Promise<void>;
  fetchPokemon: (apiId: number) => Promise<void>;
  sx?: SxProps;
}

export const AddPokReview = (props: Props) => {
  const { fetchRatings, pokemon, userId, fetchPokemon } = props;

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [error, setError] = useState<null | string>(null);

  const addPokemon = async () => {
    if (!rating) {
      setError('Please, select rating');
      toast('You have issue in your review', {
        type: 'error',
        toastId: 'input-error',
      });
      return;
    }

    setLoading(true);
    const data = await pokemonModel.addPokemonRating({
      rating,
      pokemon,
      text,
      user: {
        id: userId,
      },
    });

    if (data) {
      await fetchRatings(data.favPokemon.id);
      await fetchPokemon(data.favPokemon.apiId);
      toast('New review was added!', {
        type: 'success',
        toastId: 'added-new-review',
      });
    }

    setLoading(false);
  };

  const onRatingChange = (_: any, newValue: number | null) => {
    setRating(newValue);
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 2,
        ...props.sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          width: '100%',
        }}
      >
        <TextField
          helperText={error}
          error={Boolean(error)}
          value={text}
          onChange={onTextChange}
          size="small"
        />
        <Button
          onClick={addPokemon}
          disabled={loading}
          variant="contained"
          size="medium"
        >
          {loading ? 'Loading...' : 'Add'}
        </Button>
      </Box>

      <Rating value={rating} onChange={onRatingChange} size="large" />
    </Box>
  );
};
