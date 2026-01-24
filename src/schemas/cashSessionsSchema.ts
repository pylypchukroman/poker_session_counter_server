import Joi from "joi";
import type { ObjectSchema } from 'joi';
import type { CreateCashSessionPayload, EditCashSessionPayload, PokerRoomBalance } from '../types/types.js';

export const pokerRoomBalanceSchema: ObjectSchema<PokerRoomBalance> =
  Joi.object<PokerRoomBalance>({
    name: Joi.string().trim().min(1).required(),
    balance: Joi.number().min(0).required(),
  });


export const cashSessionsSchema: ObjectSchema<CreateCashSessionPayload> =
  Joi.object<CreateCashSessionPayload>({
    startedAt: Joi.date().required(),

    finishedAt: Joi.date()
      .greater(Joi.ref('startedAt'))
      .allow(null),

    status: Joi.string()
      .valid('running', 'finished')
      .required(),

    balancesStart: Joi.array()
      .items(pokerRoomBalanceSchema)
      .min(1)
      .required(),

    balancesEnd: Joi.array()
      .items(pokerRoomBalanceSchema)
      .when('status', {
        is: 'finished',
        then: Joi.array().min(1).required(),
        otherwise: Joi.array().max(0).required(),
      }),

    owner: Joi.string(),
  }).options({ allowUnknown: false });


export const editCashSessionSchema: ObjectSchema<EditCashSessionPayload> =
  Joi.object<EditCashSessionPayload>({
    finishedAt: Joi.date().required(),

    status: Joi.string()
      .valid('finished')
      .required(),

    balancesEnd: Joi.array()
      .items(pokerRoomBalanceSchema)
      .min(1)
      .required(),
  }).options({ allowUnknown: false });
