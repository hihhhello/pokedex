import { Request, Router, Response, NextFunction } from 'express';
import axios, { AxiosPromise } from 'axios';
import { LoginDataResponse } from './types';

export const router = Router();

router.get(
  '/:code',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.params;

      const { data } = await axios.post<LoginDataResponse>(
        'https://github.com/login/oauth/access_token',
        {},
        {
          params: {
            client_id: process.env.APP_CLIENT_ID,
            client_secret: process.env.APP_CLIENT_SECRET,
            code,
          },
          headers: {
            Accept: 'application/json',
          },
        }
      );

      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
);
