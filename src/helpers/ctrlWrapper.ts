import type { NextFunction, RequestHandler } from 'express';

export const ctrlWrapper =
  (ctrl: (req, res, next: NextFunction) => Promise<void>): RequestHandler =>
    async (req, res, next) => {
      try {
        await ctrl(req, res, next);
      } catch (error) {
        next(error);
      }
    };
