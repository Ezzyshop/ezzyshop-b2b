import Joi from 'joi';

const botTemplateButtonSchema = Joi.object({
  text: Joi.string().required(),
  action: Joi.string().valid('menu', 'orders', 'feedback', 'language').required(),
  type: Joi.string().valid('callback', 'url').required(),
  order: Joi.number().integer().min(0).required(),
});

export const telegramSettingsResolver = Joi.object({
  welcomeMessage: Joi.string().required().min(1).max(1000),
  menuHintText: Joi.string().required().min(1).max(500),
  buttons: Joi.array().items(botTemplateButtonSchema),
});
