import { HttpError } from '../helpers/HttpError.ts';
import { isValidObjectId } from 'mongoose';
import type { Request, Response, NextFunction } from "express";

interface BalanceParams {
  balanceId: string;
}

interface SessionParams {
  sessionId: string;
}

export const isValidBalanceId = (req: Request<BalanceParams>, res: Response, next: NextFunction) => {
  const { balanceId } = req.params;
  if (!isValidObjectId(balanceId)) {
    next(HttpError(400, `${balanceId} is not valid id`));
  }
  next();
};

export const isValidSessionId = (req: Request<SessionParams>, res: Response, next: NextFunction) => {
  const { sessionId } = req.params;
  if (!isValidObjectId(sessionId)) {
    next(HttpError(400, `${sessionId} is not valid id`));
  }
  next();
};
