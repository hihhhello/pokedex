import { ParamSchema } from 'express-validator';
import { AddFavPokemonDto } from './types';

export const createValidationSchema: Record<
  keyof AddFavPokemonDto,
  ParamSchema
> = {
  apiId: {
    isNumeric: true,
  },
  avatarUrl: {
    isString: true,
    optional: true,
  },
  name: {
    isString: true,
  },
};
