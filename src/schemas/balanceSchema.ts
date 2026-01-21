import Joi from 'joi';
import type { ObjectSchema } from 'joi';
import type { BalancePayload, EditBalancePayload } from '../types/types';

export const balanceSchema: ObjectSchema<BalancePayload> =
  Joi.object<BalancePayload>({
    name: Joi.string().trim().min(1).required(),
    balance: Joi.number().min(0).required(),
    owner: Joi.string(),
  });

export const editBalanceSchema: ObjectSchema<EditBalancePayload> =
  Joi.object<EditBalancePayload>({
    balance: Joi.number().min(0).required(),
  });
