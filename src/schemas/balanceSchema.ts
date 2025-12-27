import Joi from 'joi';

export const balanceSchema = Joi.object({
  name: Joi.string().required(),
  balance: Joi.number().required()
});
