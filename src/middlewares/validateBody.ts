import { HttpError } from '../helpers/HttpError.ts';

export const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing required name field"));
    }
    next()
  }
  return func;
};
