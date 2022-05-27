import { Request, Router, Response, NextFunction } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { ApiError } from '../exceptions';
import { createValidationSchema, editValidationSchema } from './helpers';
import { Service } from './pok-ratings.service';

export const router = Router();

router.post(
  '/',
  checkSchema(createValidationSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const review = await Service.create(req.body);

      return res.status(200).json(review);
    } catch (e) {
      next(e);
    }
  }
);

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const rating = await Service.getOne(+id);

    return res.status(200).json(rating);
  } catch (e) {
    next(e);
  }
});

// Returns all pokemon reviews
router.get(
  '/pokemon/:pokId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { pokId } = req.params;

      const { limit, offset } = req.query;

      const data = await Service.getAll(+pokId, {
        limit: limit ? +limit : undefined,
        offset: offset ? +offset : undefined,
      });

      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const review = await Service.delete(+id);

      return res.status(200).json(review);
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  '/:id',
  checkSchema(editValidationSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const { id } = req.params;
      const body = req.body;

      const review = await Service.edit(+id, body);

      return res.status(200).json(review);
    } catch (e) {
      next(e);
    }
  }
);
