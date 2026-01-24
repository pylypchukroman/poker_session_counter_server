import { HttpError } from '../helpers/HttpError.ts';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import type { RequestHandler } from 'express';
import type { RequestWithUser } from '../types/types';


export const autoriz: RequestHandler = async (req, _res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(HttpError(401, 'Not authorized'));
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(HttpError(401, 'Not authorized'));
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user: User = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      return next(HttpError(401, 'Not authorized'));
    }

    (req as RequestWithUser).user = user;

    next();
  } catch {
    return next(HttpError(401, 'Not authorized'));
  }
};
