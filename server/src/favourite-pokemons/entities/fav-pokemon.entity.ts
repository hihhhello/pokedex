import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PokRating } from '../../pok-ratings';
import { PokStats } from '../../pok-ratings/entities/pok-stats.entity';
import { UserToFavPokemon } from '../../users';

@Entity('fav_pokemon')
export class FavouritePokemon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'api_id' })
  apiId: number;

  @Column()
  name: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string;

  @OneToMany(() => UserToFavPokemon, (entity) => entity.favPokemon)
  userToFavPokemons: UserToFavPokemon[];

  @OneToMany(() => PokRating, (pokRating) => pokRating.favPokemon)
  pokRatings: PokRating[];

  @OneToOne(() => PokStats, (e) => e.favPokemon)
  stats: PokStats;
}
