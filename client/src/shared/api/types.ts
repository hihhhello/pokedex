export interface PaginationOptions {
  offset?: number;
  limit?: number;
}

export interface FavPokemon {
  id: number;
  apiId: number;
  name: string;
  avatarUrl: string;
}

export * from './github-pokedex/types';
