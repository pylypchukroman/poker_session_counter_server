import { HttpError } from '../helpers/HttpError.ts';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.ts';

export const autoriz = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw HttpError(401, 'Not authorized');
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    throw HttpError(401, 'Not authorized');
  }

  try {
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!token || !user.token || user.token !== token) {
      next(HttpError(401, 'Not authorized'));
    }
    req.user = user;
  } catch {
    next(HttpError(401, 'Not authorized'))
  }
  next();
}
