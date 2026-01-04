import Joi from 'joi';

export const tournamentSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),

  buyIn: Joi.number().positive().required(),

  startedAt: Joi.date().required(),

  finishedAt: Joi.date()
    .greater(Joi.ref("startedAt"))
    .allow(null),

  status: Joi.string()
    .valid("running", "finished")
    .required(),

  result: Joi.when("status", {
    is: "finished",
    then: Joi.number().required(),
    otherwise: Joi.forbidden(),
  }),
}).options({ allowUnknown: false });

export const addTournamentSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),

  buyIn: Joi.number().positive().required(),

  startedAt: Joi.date().required(),

  status: Joi.string()
    .valid("running")
    .required(),
}).options({ allowUnknown: false });

export const finishTournamentSchema = Joi.object({
  finishedAt: Joi.date().required(),

  status: Joi.string()
    .valid("finished")
    .required(),

  result: Joi.number().required(),
}).options({ allowUnknown: false });
