import { FavouritePokemon } from '../../favourite-pokemons';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_favourite_pokemon')
export class UserToFavPokemon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userToFavPokemons)
  user: User;

  @ManyToOne(() => FavouritePokemon, (pokemon) => pokemon.userToFavPokemons)
  favPokemon: FavouritePokemon;
}
