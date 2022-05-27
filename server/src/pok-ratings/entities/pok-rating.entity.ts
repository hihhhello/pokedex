import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FavouritePokemon } from '../../favourite-pokemons';
import { User } from '../../users';

@Entity('pok_ratings')
export class PokRating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.pokRatings)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToOne(() => FavouritePokemon, (pok) => pok.pokRatings)
  @JoinColumn({
    name: 'fav_pok_id',
  })
  favPokemon: FavouritePokemon;

  @Column()
  text: string;

  @Column()
  rating: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
