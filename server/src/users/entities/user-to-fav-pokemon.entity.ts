import { FavouritePokemon } from '../../favourite-pokemons';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_favourite_pokemon')
export class UserToFavPokemon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userToFavPokemons)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToOne(() => FavouritePokemon, (pokemon) => pokemon.userToFavPokemons)
  @JoinColumn({
    name: 'pokemon_id',
  })
  favPokemon: FavouritePokemon;
}
