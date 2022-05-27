import { getManager } from 'typeorm';
import { ApiError } from '../exceptions';
import {
  DEFAULT_PAGINATION_OFFSET,
  DEFAULT_PAGINATION_LIMIT,
} from '../shared/constants';
import { PaginatedData, PaginationOptions } from '../shared/types';
import { FavouritePokemon } from './entities';
import { AddFavPokemonDto } from './types';
import { User, UserToFavPokemon } from '../users/entities';

export class Service {
  static async getOne(id: number) {
    const pokemon = await FavouritePokemon.findOne({
      where: {
        id,
      },
      relations: ['stats'],
    });

    if (!pokemon) {
      throw ApiError.NotFound(`Pokemon with id ${id} not found`);
    }

    return pokemon;
  }

  static async add(userId: number, dto: AddFavPokemonDto) {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      relations: ['userToFavPokemons', 'stats'],
    });

    if (!user) {
      throw ApiError.BadRequest('User not found');
    }

    let favPokemon = await FavouritePokemon.findOne({
      where: {
        apiId: dto.apiId,
      },
    });

    if (!favPokemon) {
      favPokemon = FavouritePokemon.create();
      Object.assign(favPokemon, dto);
      await favPokemon.save();
    }

    const userPokemon = await UserToFavPokemon.findOne({
      where: {
        user: {
          id: userId,
        },
        favPokemon: {
          apiId: dto.apiId,
        },
      },
    });

    if (userPokemon) {
      throw ApiError.BadRequest('Record already exists');
    }

    const newUserPokemon = UserToFavPokemon.create();
    // @ts-ignore
    newUserPokemon.favPokemon = favPokemon;
    newUserPokemon.user = user;

    await newUserPokemon.save();
  }

  static async getAll(userId: number, pagination?: PaginationOptions) {
    const limit = pagination?.limit || DEFAULT_PAGINATION_LIMIT;
    const offset = pagination?.offset || DEFAULT_PAGINATION_OFFSET;

    const data: PaginatedData = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw ApiError.BadRequest('User not found');
    }

    const count = await UserToFavPokemon.count();

    const pokemons = await UserToFavPokemon.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['favPokemon'],
      take: limit,
      skip: offset,
    });

    data.results = pokemons;
    data.count = count;

    const hasNext = limit + offset < count;

    if (hasNext) {
      data.next = `${process.env.BASE_URL}/api/fav-pokemons/${userId}?offset=${
        offset + limit
      }&limit=${limit}`;
    }

    const hasPrev = offset !== 0;

    if (hasPrev) {
      data.previous = `${
        process.env.BASE_URL
      }/api/fav-pokemons/${userId}?offset=${offset - limit}&limit=${limit}`;
    }
    return data;
  }

  static async getAllApiIds(userId: number) {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw ApiError.BadRequest('User not found');
    }

    const data = await UserToFavPokemon.find({
      where: {
        user: {
          id: userId,
        },
      },
      select: {
        favPokemon: {
          id: true,
          apiId: true,
        },
      },
      relations: ['favPokemon'],
    });

    return data.map((item) => item.favPokemon.apiId);
  }

  static async deleteFavPokemon(userId: number, pokApiId: number) {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw ApiError.BadRequest('User not found');
    }

    const favPokemon = await FavouritePokemon.findOne({
      where: {
        apiId: pokApiId,
      },
    });

    if (!favPokemon) {
      throw ApiError.BadRequest('Pokemon not found');
    }

    const recordToDelete = await UserToFavPokemon.findOne({
      where: {
        user: {
          id: userId,
        },
        favPokemon: {
          apiId: pokApiId,
        },
      },
      relations: ['user', 'favPokemon'],
    });

    if (!recordToDelete) {
      throw ApiError.BadRequest('Relation not found');
    }

    await UserToFavPokemon.delete(recordToDelete.id);

    return;
  }
}
