import Joi from "joi";

export const staffValidator = Joi.object({
  full_name: Joi.string().required().max(255).messages({
    "any.required": "Full name is required",
    "string.max": "Full name must be at most 255 characters long",
  }),
  phone: Joi.string().required().max(15).messages({
    "any.required": "Phone is required",
    "string.base": "Phone must be a string",
    "string.max": "Phone must be at most 15 characters long",
  }),
  photo: Joi.string().max(255).allow(null, "").messages({
    "string.max": "Photo must be at most 255 characters long",
  }),
  isAdmin: Joi.boolean().default(false),
  roleId: Joi.when("isAdmin", {
    is: false,
    then: Joi.string().required().messages({ "any.required": "Role is required for non-admin staff" }),
    otherwise: Joi.string().allow(null, "").optional(),
  }),
});
