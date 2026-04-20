import Joi from 'joi';

export const botTemplateResolver = Joi.object({
  welcomeMessage: Joi.string().required().min(1).max(1000),
  botDescription: Joi.string().optional().allow('').max(512),
  buttonText: Joi.string().optional().allow('').max(64),
});

export const broadcastResolver = Joi.object({
  message: Joi.string().required().min(1).max(4096),
});
