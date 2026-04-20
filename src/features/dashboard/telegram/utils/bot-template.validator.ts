import Joi from 'joi';

export const botTemplateResolver = Joi.object({
  welcomeMessage: Joi.string().required().min(1).max(1000),
  menuHintText: Joi.string().optional().allow('').max(500),
});
