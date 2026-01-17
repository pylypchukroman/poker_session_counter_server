import Joi from "joi";

const pokerRoomBalanceSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  balance: Joi.number().min(0).required(),
});

export const cashSessionsSchema = Joi.object({
  startedAt: Joi.date().required(),

  finishedAt: Joi.date()
    .greater(Joi.ref("startedAt"))
    .allow(null),

  status: Joi.string()
    .valid("running", "finished")
    .required(),

  balancesStart: Joi.array()
    .items(pokerRoomBalanceSchema)
    .min(1)
    .required(),

  balancesEnd: Joi.array()
    .items(pokerRoomBalanceSchema)
    .when("status", {
      is: "finished",
      then: Joi.array().min(1).required(),
      otherwise: Joi.array().max(0).required(),
    }),
  owner: Joi.string()
})
  .options({ allowUnknown: false });

export const editCashSessionSchema = Joi.object({
  finishedAt: Joi.date()
    .required(),

  status: Joi.string()
    .valid("finished")
    .required(),

  balancesEnd: Joi.array()
    .items(pokerRoomBalanceSchema)
    .min(1)
    .required(),

}).options({ allowUnknown: false });
