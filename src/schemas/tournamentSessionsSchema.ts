import Joi from 'joi';
import { tournamentSchema } from './tournamentSchema.ts';

export const tournamentSessionsSchema = Joi.object({
  startedAt: Joi.date().required(),

  finishedAt: Joi.date()
    .greater(Joi.ref("startedAt"))
    .allow(null),

  status: Joi.string()
    .valid("running", "finished")
    .required(),

  tournaments: Joi.array()
    .items(tournamentSchema)
    .default([]),
}).options({ allowUnknown: false });

export const finishTournamentSessionSchema = Joi.object({
  finishedAt: Joi.date().required(),

  status: Joi.string()
    .valid("finished")
    .required(),
}).options({ allowUnknown: false });


export const editTournamentSessionsSchema = Joi.object({
  status: Joi.string()
    .valid("running", "finished")
    .required(),
})
  .options({ allowUnknown: false });
