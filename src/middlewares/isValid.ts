import { HttpError } from '../helpers/HttpError.ts';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not valid id`));
  }
  next();
};
