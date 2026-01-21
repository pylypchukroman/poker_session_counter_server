import { Types } from 'mongoose';
import { User } from './types';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
