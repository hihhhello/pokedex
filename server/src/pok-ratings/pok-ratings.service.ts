import { ApiError } from '../exceptions';
import { FavouritePokemon } from '../favourite-pokemons';
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_OFFSET,
} from '../shared/constants';
import { PaginatedData, PaginationOptions } from '../shared/types';
import { PokRating, PokStats } from './entities';
import { AddPokRatingDto, EditPokRatingDto } from './types';

export class Service {
  private static async addRatingStats(stats: PokStats, rating: number) {
    stats.average =
      (stats.average * stats.totalReviews + rating) / (stats.totalReviews + 1);

    stats.totalReviews++;

    stats.starsRatings[rating].count++;

    await stats.save();
  }

  private static async deleteRatingStats(stats: PokStats, rating: number) {
    stats.average =
      (stats.average * stats.totalReviews - rating) / (stats.totalReviews - 1);

    stats.totalReviews--;

    stats.starsRatings[rating].count--;

    await stats.save();
  }

  static async create(dto: AddPokRatingDto) {
    let pokemon = await FavouritePokemon.findOne({
      where: {
        apiId: dto.pokemon.apiId,
      },
    });

    if (!pokemon) {
      pokemon = FavouritePokemon.create();
      Object.assign(pokemon, dto.pokemon);
      await pokemon.save();

      const stats = PokStats.create();
      stats.favPokemon = pokemon;
      await stats.save();
    }

    const rating = PokRating.create(dto);
    rating.favPokemon = pokemon;
    await rating.save();

    // Retreive pokemon stats with different call because pokemon.stats would be undefined if we would try to
    // get relations: ['stats'] if there is no pokemon
    const stats = await PokStats.findOne({
      where: {
        favPokemon: {
          id: pokemon.id,
        },
      },
    });

    if (!stats) {
      throw ApiError.NotFound('Stats for this pokemon not found');
    }

    await this.addRatingStats(stats, dto.rating);

    return rating;
  }

  static async getOne(id: number) {
    const rating = await PokRating.findOne({
      where: {
        id,
      },
    });

    if (!rating) {
      throw ApiError.NotFound(`Rating with ID ${id} not found`);
    }

    return rating;
  }

  static async getAll(pokId: number, pagination: PaginationOptions) {
    const pokemon = await FavouritePokemon.findOne({
      where: {
        id: pokId,
      },
    });

    if (!pokemon) {
      throw ApiError.NotFound('Pokemon not found');
    }

    const limit = pagination?.limit || DEFAULT_PAGINATION_LIMIT;
    const offset = pagination?.offset || DEFAULT_PAGINATION_OFFSET;

    const data: PaginatedData = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    const count = await PokRating.count({
      where: {
        favPokemon: {
          id: pokId,
        },
      },
    });

    const reviews = await PokRating.find({
      where: {
        favPokemon: {
          id: pokId,
        },
      },
      relations: ['user'],
      take: limit,
      skip: offset,
    });

    data.results = reviews;
    data.count = count;

    const hasNext = limit + offset < count;

    if (hasNext) {
      data.next = `${process.env.BASE_URL}/api/fav-pokemons/${pokId}?offset=${
        offset + limit
      }&limit=${limit}`;
    }

    const hasPrev = offset !== 0;

    if (hasPrev) {
      data.previous = `${
        process.env.BASE_URL
      }/api/fav-pokemons/${pokId}?offset=${offset - limit}&limit=${limit}`;
    }
    return data;
  }

  static async delete(id: number) {
    const review = await PokRating.findOne({
      where: {
        id,
      },
      relations: ['favPokemon'],
    });

    if (!review) {
      throw ApiError.NotFound(`Review with id ${id} not found`);
    }

    const pokStats = await PokStats.findOne({
      where: {
        favPokemon: {
          id: review.favPokemon.id,
        },
      },
    });

    if (!pokStats) {
      throw ApiError.NotFound('Pok stats not found');
    }

    await this.deleteRatingStats(pokStats, review.rating);

    await review.remove();

    return review;
  }
  static async edit(id: number, dto: EditPokRatingDto) {
    const review = await PokRating.findOne({
      where: {
        id,
      },
      relations: ['favPokemon'],
    });

    if (!review) {
      throw ApiError.NotFound(`Review to edit not found`);
    }

    const pokStats = await PokStats.findOne({
      where: {
        favPokemon: {
          id: review.favPokemon.id,
        },
      },
    });

    if (!pokStats) {
      throw ApiError.NotFound(`Pok stats not found`);
    }

    await this.deleteRatingStats(pokStats, review.rating);
    await this.addRatingStats(pokStats, dto.rating);

    if (dto.rating) {
      review.rating = dto.rating;
    }

    if (dto.text) {
      review.text = dto.text;
    }

    await review.save();
    return review;
  }
}
