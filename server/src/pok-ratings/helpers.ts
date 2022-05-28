import { ParamSchema } from 'express-validator';
import { AddPokRatingDto, EditPokRatingDto } from './types';

export const defaultRatings = {
  1: {
    count: 0,
    value: 1,
  },
  2: {
    count: 0,
    value: 2,
  },
  3: {
    count: 0,
    value: 3,
  },
  4: {
    count: 0,
    value: 4,
  },
  5: {
    count: 0,
    value: 5,
  },
};

export const createValidationSchema: Record<
  keyof AddPokRatingDto | string,
  ParamSchema
> = {
  'pokemon.apiId': {
    isNumeric: true,
  },
  'pokemon.avatarUrl': {
    isString: true,
    optional: true,
  },
  'pokemon.name': {
    isString: true,
  },
  rating: {
    isNumeric: true,
  },
  text: {
    isString: true,
  },
  'user.id': {
    isNumeric: true,
  },
};

export const editValidationSchema: Record<keyof EditPokRatingDto, ParamSchema> =
  {
    rating: {
      isNumeric: true,
      optional: true,
    },
    text: {
      isString: true,
      optional: true,
    },
  };
