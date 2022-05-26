import {
  CardHeader,
  SxProps,
  Card,
  CardMedia,
  CardActions,
} from '@mui/material';
// @ts-ignore
import defaultPokemonPng from 'assets/default-pokemon.png';
import React from 'react';

export interface Props {
  name: string;
  avatarUrl?: string | null;
  actions?: React.ReactNode[];
  sx?: SxProps;
}

export const PokemonCard = ({ actions = [], name, avatarUrl, sx }: Props) => {
  return (
    <Card sx={sx}>
      <CardHeader title={name} />
      <CardMedia component="img" src={avatarUrl || defaultPokemonPng} />
      <CardActions>
        {actions.map((item, i) => (
          <React.Fragment key={i}>{item}</React.Fragment>
        ))}
      </CardActions>
    </Card>
  );
};
