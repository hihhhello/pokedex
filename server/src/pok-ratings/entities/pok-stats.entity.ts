import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FavouritePokemon } from '../../favourite-pokemons';
import { defaultRatings } from '../helpers';
import { StarRating } from './pokemon-review-arg';

@Entity('pok_stats')
export class PokStats extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => FavouritePokemon, (e) => e.stats)
  @JoinColumn({
    name: 'fav_pokemon_id',
  })
  favPokemon: FavouritePokemon;

  @Column({
    type: 'json',
    default: defaultRatings,
    name: 'stars_ratings',
  })
  starsRatings: Record<number, StarRating>;

  @Column({ name: 'total_reviews', default: 0 })
  totalReviews: number;

  @Column({ default: 0, type: 'float' })
  average: number;
}
