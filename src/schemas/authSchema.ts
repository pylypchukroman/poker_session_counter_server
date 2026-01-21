import Joi from 'joi';
import type { ObjectSchema } from 'joi';
import type { LoginUserPayload, RegisterUserPayload } from '../types/types';

export const registerUserSchema: ObjectSchema<RegisterUserPayload> =
  Joi.object<RegisterUserPayload>({
    name: Joi.string().trim().min(1).required(),
    email: Joi.string().trim().min(1).required(),
    password: Joi.string().trim().min(1).required(),
  });

export const loginUserSchema: ObjectSchema<LoginUserPayload> =
  Joi.object<LoginUserPayload>({
    email: Joi.string().trim().min(1).required(),
    password: Joi.string().trim().min(1).required(),
  });
