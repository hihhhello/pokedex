import { PokStats } from './pok-ratings/models';

export interface User {
  id: number;
  login: string;
  githubId: number;
  avatarUrl?: string;
  githubHtmlUrl?: string;
  email?: string;
  name?: string;
  bio?: string;
  createdAt: Date;
}

export interface FavPokemon {
  id: number;
  apiId: number;
  name: string;
  avatarUrl: string;
  stats: PokStats;
}

export type UserFavPokemon = {
  id: number;
  favPokemon: FavPokemon;
};

export * from './pok-ratings/models';
