import { resolveSoa } from 'dns';
import { Request, Router, Response, NextFunction } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { ApiError } from '../exceptions';
import { Service } from './fav-pokemons.service';
import { createValidationSchema } from './helpers';

export const router = Router();

router.post(
  '/:userId',
  checkSchema(createValidationSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const { userId } = req.params;

      await Service.add(+userId, req.body);

      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { limit, offset } = req.query;
      const data = await Service.getAll(+userId, {
        limit: limit ? +limit : undefined,
        offset: offset ? +offset : undefined,
      });

      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
);

// Return apiIds of favourite pokemons
router.get(
  '/:userId/apiIds',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const data = await Service.getAllApiIds(+userId);

      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  '/:userId/:pokApiId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, pokApiId } = req.params;
      await Service.deleteFavPokemon(+userId, +pokApiId);

      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
);
