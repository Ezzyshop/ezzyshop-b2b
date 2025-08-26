import Joi from "joi";

export const createTelegramResolver = Joi.object({
  token: Joi.string().min(1).max(100).required(),
  menu_text: Joi.string().min(1).max(32).required(),
});

export const updateTelegramValidator = Joi.object({
  menu_text: Joi.string().min(1).max(32).required(),
});
