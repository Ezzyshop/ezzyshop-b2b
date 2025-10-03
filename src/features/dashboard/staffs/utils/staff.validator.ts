import { UserStatus } from "@/lib/enums";
import Joi from "joi";

export const userFields = {
  full_name: Joi.string().required().max(255).messages({
    "any.required": "Full name is required",
    "string.max": "Full name must be at most 255 characters long",
  }),
  phone: Joi.string().required().max(15).messages({
    "any.required": "Phone is required",
    "string.base": "Phone must be a string",
    "string.max": "Phone must be at most 15 characters long",
  }),
  photo: Joi.string().max(255).allow(null).messages({
    "string.max": "Photo must be at most 255 characters long",
    "string.uri": "Photo must be a valid URL",
  }),
};

export const staffValidator = Joi.object({
  full_name: userFields.full_name,
  phone: userFields.phone,
  photo: userFields.photo,
});

export const changeStaffStatusValidator = Joi.object({
  status: Joi.string()
    .valid(...Object.values(UserStatus))
    .required(),
});
