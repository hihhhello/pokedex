import { Router } from 'express';
import { usersRouter } from './users';
import { favPokemonsRouter } from './favourite-pokemons';
import { authRouter } from './auth';

export const router = Router();

router.use('/users', usersRouter);
router.use('/fav-pokemons', favPokemonsRouter);
router.use('/auth', authRouter);
