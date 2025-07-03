import Joi from "joi";

export const loginSchema = Joi.object({
  phone: Joi.string().min(11).required().messages({
    "string.min": "Telefon raqamni kiriting",
    "string.empty": "Telefon raqamni kiriting",
    "any.required": "Telefon raqamni kiriting",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Parolni kiriting",
    "string.empty": "Parolni kiriting",
    "any.required": "Parolni kiriting",
  }),
});
