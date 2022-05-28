import { ParamSchema } from 'express-validator';
import { CreateUserDto } from './types';

export const createValidationSchema: Record<keyof CreateUserDto, ParamSchema> =
  {
    login: {
      isString: true,
    },
    githubId: {
      isNumeric: true,
    },
    avatarUrl: {
      optional: true,
    },
    githubHtmlUrl: {
      optional: true,
    },
    email: {
      optional: true,
    },
    bio: {
      optional: true,
    },
    name: {
      optional: true,
    },
  };
