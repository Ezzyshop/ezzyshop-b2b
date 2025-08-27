import Joi from "joi";

export const loginSchema = Joi.object({
  otp: Joi.string().required(),
});
