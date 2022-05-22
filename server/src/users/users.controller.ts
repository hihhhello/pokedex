import { Request, Router, Response, NextFunction } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { ApiError } from '../exceptions';
import { createValidationSchema } from './helpers';
import { Service } from './users.service';

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

      const user = await Service.create(req.body);

      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/:login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { login } = req.params;

      const user = await Service.check(login);

      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
);
