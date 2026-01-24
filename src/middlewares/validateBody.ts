import { HttpError } from '../helpers/HttpError';
import type { RequestHandler } from 'express';
import type { ObjectSchema } from 'joi';
import type { ParamsDictionary } from "express-serve-static-core";

export const validateBody =
  <T, P extends ParamsDictionary = ParamsDictionary>(
    schema: ObjectSchema<T>
  ): RequestHandler<P, any, T> =>
    (req, _res, next) => {
      const { value, error } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return next(HttpError(400, error.message));
      }

      req.body = value as T;
      next();
    };
