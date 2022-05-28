import { Star } from '@mui/icons-material';
import {
  CardHeader,
  SxProps,
  Card,
  CardMedia,
  CardActions,
  Stack,
  Typography,
} from '@mui/material';
// @ts-ignore
import defaultPokemonPng from 'assets/default-pokemon.png';
import React from 'react';

export interface Props {
  name?: string;
  avatarUrl?: string | null;
  actions?: React.ReactNode[];
  averageRating?: number;
  sx?: SxProps;
}

export const PokemonCard = ({
  actions = [],
  name = 'Pokemon',
  avatarUrl,
  sx,
  averageRating = 0,
}: Props) => {
  return (
    <Card sx={sx}>
      <Stack
        display="flex"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <CardHeader title={name} />
        <Stack
          padding={2}
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <Typography
            aria-label={`Average pokemon rating ${averageRating} from 5`}
            fontSize={32}
          >
            {averageRating}/5
          </Typography>
          <Star
            fontSize="large"
            aria-label="Star icon"
            sx={{ fill: '#F6BE00' }}
          />
        </Stack>
      </Stack>

      <CardMedia component="img" src={avatarUrl || defaultPokemonPng} />
      <CardActions>
        {actions.map((item, i) => (
          <React.Fragment key={i}>{item}</React.Fragment>
        ))}
      </CardActions>
    </Card>
  );
};
