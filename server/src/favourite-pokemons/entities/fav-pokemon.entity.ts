import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
}
