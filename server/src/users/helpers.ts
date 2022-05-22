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
      isString: true,
    },
    githubHtmlUrl: {
      optional: true,
      isString: true,
    },
    email: {
      isEmail: true,
    },
    bio: {
      isString: true,
      optional: true,
    },
    name: {
      isString: true,
      optional: true,
    },
  };
