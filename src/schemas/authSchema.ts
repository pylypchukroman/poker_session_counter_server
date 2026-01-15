import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  email: Joi.string().trim().min(1).required(),
  password: Joi.string().trim().min(1).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().trim().min(1).required(),
  password: Joi.string().trim().min(1).required(),
});
