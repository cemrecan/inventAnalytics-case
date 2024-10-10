import Joi from "joi";

export const createUserBodyValidator = Joi.object({
  name: Joi.string().required(),
});

export const createBookBodyValidator = Joi.object({
  name: Joi.string().required(),
});

export const scoreBodyValidator = Joi.object({
  score: Joi.number().required(),
});
