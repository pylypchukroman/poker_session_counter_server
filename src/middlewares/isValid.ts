import { HttpError } from '../helpers/HttpError.ts';
import { isValidObjectId } from 'mongoose';

export const isValidBalanceId = (req, res, next) => {
  const { balanceId } = req.params;
  if (!isValidObjectId(balanceId)) {
    next(HttpError(400, `${balanceId} is not valid id`));
  }
  next();
};

export const isValidSessionId = (req, res, next) => {
  const { sessionId } = req.params;
  if (!isValidObjectId(sessionId)) {
    next(HttpError(400, `${sessionId} is not valid id`));
  }
  next();
};
