import { HttpError } from '../helpers/HttpError.ts';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { balanceId } = req.params;
  if (!isValidObjectId(balanceId)) {
    next(HttpError(400, `${balanceId} is not valid id`));
  }
  next();
};
