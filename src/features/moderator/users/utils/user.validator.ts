import Joi from "joi";
import { UserRoles } from "@/lib/enums";

export const userFields = {
  full_name: Joi.string().required().max(255).messages({
    "any.required": "Full name is required",
    "string.max": "Full name must be at most 255 characters long",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(255)
    .allow(null, "")
    .messages({
      "string.email": "Invalid email address",
      "string.max": "Email must be at most 255 characters long",
    }),
  phone: Joi.string().max(15).messages({
    "string.base": "Phone must be a string",
    "string.max": "Phone must be at most 15 characters long",
  }),
  password: Joi.string().min(8).max(32).messages({
    "any.required": "Password is required",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters long",
    "string.max": "Password must be at most 32 characters long",
  }),
  confirm_password: Joi.string()
    .min(8)
    .max(32)
    .valid(Joi.ref("password"))
    .messages({
      "any.required": "Confirm password is required",
      "string.empty": "Confirm password is required",
      "any.only": "Passwords do not match",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 32 characters long",
    }),
  photo: Joi.string().max(255).allow(null).messages({
    "string.max": "Photo must be at most 255 characters long",
    "string.uri": "Photo must be a valid URL",
  }),
  roles: Joi.array()
    .items(Joi.string().valid(...Object.values(UserRoles)))
    .messages({
      "array.includes": "Invalid role",
    }),
};

export const createUserValidator = Joi.object({
  full_name: userFields.full_name,
  phone: userFields.phone,
  photo: userFields.photo,
  password: userFields.password.required(),
  confirm_password: userFields.confirm_password.required(),
  roles: userFields.roles,
});

export const updateUserValidator = Joi.object({
  full_name: userFields.full_name,
  phone: userFields.phone,
  photo: userFields.photo,
  roles: userFields.roles,
});

export const changePasswordValidator = Joi.object({
  password: userFields.password.required(),
  confirm_password: userFields.confirm_password.required(),
});

export const updateMyPasswordValidator = Joi.object({
  current_password: userFields.password.required(),
  password: userFields.password.required(),
  confirm_password: userFields.confirm_password.required(),
});

export const updateMyProfileValidator = Joi.object({
  full_name: userFields.full_name,
  photo: userFields.photo,
  email: userFields.email,
  phone: userFields.phone,
});
