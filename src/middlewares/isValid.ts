import { HttpError } from '../helpers/HttpError';
import { isValidObjectId } from 'mongoose';
import type { RequestHandler } from 'express';
import type { BalanceParams, SessionParams } from '../types/types';

export const isValidBalanceId: RequestHandler<BalanceParams> = (req, _res, next) => {
  const { balanceId } = req.params;

  if (!isValidObjectId(balanceId)) {
    return next(HttpError(400, `${balanceId} is not valid id`));
  }

  next();
};

export const isValidSessionId: RequestHandler<SessionParams> = (req, _res, next) => {
  const { sessionId } = req.params;

  if (!isValidObjectId(sessionId)) {
    return next(HttpError(400, `${sessionId} is not valid id`));
  }

  next();
};
