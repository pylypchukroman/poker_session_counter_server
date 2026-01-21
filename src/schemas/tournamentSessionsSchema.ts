import Joi from 'joi';
import { tournamentSchema } from './tournamentSchema.ts';
import type { ObjectSchema } from 'joi';
import type {
  CreateTournamentSessionPayload,
  EditTournamentSessionPayload,
  FinishTournamentSessionPayload
} from '../types/types';

export const tournamentSessionsSchema: ObjectSchema<CreateTournamentSessionPayload> =
  Joi.object<CreateTournamentSessionPayload>({
    startedAt: Joi.date().required(),

    finishedAt: Joi.date()
      .greater(Joi.ref('startedAt'))
      .allow(null),

    status: Joi.string()
      .valid('running', 'finished')
      .required(),

    tournaments: Joi.array()
      .items(tournamentSchema)
      .default([]),

    owner: Joi.string(),
  }).options({ allowUnknown: false });

export const finishTournamentSessionSchema: ObjectSchema<FinishTournamentSessionPayload> =
  Joi.object<FinishTournamentSessionPayload>({
    finishedAt: Joi.date().required(),

    status: Joi.string()
      .valid('finished')
      .required(),
  }).options({ allowUnknown: false });

export const editTournamentSessionsSchema: ObjectSchema<EditTournamentSessionPayload> =
  Joi.object<EditTournamentSessionPayload>({
    status: Joi.string()
      .valid('running', 'finished')
      .required(),
  }).options({ allowUnknown: false });
