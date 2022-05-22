import { BaseEntity } from 'typeorm';
import { User } from './entities';

export type CreateUserDto = Pick<
  User,
  Exclude<
    keyof User,
    keyof BaseEntity | 'id' | 'createdAt' | 'userToFavPokemons'
  >
>;
