import Joi from 'joi';
import type { ObjectSchema } from 'joi';
import type { AddTournamentPayload, CreateTournamentPayload, FinishTournamentPayload } from '../types/types.js';

export const tournamentSchema: ObjectSchema<CreateTournamentPayload> =
  Joi.object<CreateTournamentPayload>({
    room: Joi.string().trim().min(1).required(),

    name: Joi.string().trim().min(1).required(),

    buyIn: Joi.number().positive().required(),

    startedAt: Joi.date().required(),

    finishedAt: Joi.date()
      .greater(Joi.ref('startedAt'))
      .allow(null),

    status: Joi.string()
      .valid('running', 'finished')
      .required(),

    result: Joi.when('status', {
      is: 'finished',
      then: Joi.number().required(),
      otherwise: Joi.forbidden(),
    }),
  }).options({ allowUnknown: false });


export const addTournamentSchema: ObjectSchema<AddTournamentPayload> =
  Joi.object<AddTournamentPayload>({
    room: Joi.string().trim().min(1).required(),

    name: Joi.string().trim().min(1).required(),

    buyIn: Joi.number().positive().required(),

    startedAt: Joi.date().required(),

    status: Joi.string()
      .valid('running')
      .required(),

    result: Joi.number().required(),
  }).options({ allowUnknown: false });


export const finishTournamentSchema: ObjectSchema<FinishTournamentPayload> =
  Joi.object<FinishTournamentPayload>({
    finishedAt: Joi.date().required(),

    status: Joi.string()
      .valid('finished')
      .required(),

    result: Joi.number().required(),
  }).options({ allowUnknown: false });
