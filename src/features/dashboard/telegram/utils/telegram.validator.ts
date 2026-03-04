import Joi from "joi";
import { TelegramBusinessType } from "./telegram.enum";

export const createTelegramResolver = Joi.object({
  business_type: Joi.string()
    .valid(...Object.values(TelegramBusinessType))
    .required(),
  token: Joi.string().min(1).max(100).required(),
  menu_text: Joi.string().min(1).max(32).required(),
});

export const updateTelegramValidator = Joi.object({
  menu_text: Joi.string().min(1).max(32).required(),
  business_type: Joi.string()
    .valid(...Object.values(TelegramBusinessType))
    .required(),
});
