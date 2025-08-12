import Joi from "joi";
import { BranchStatus } from "./branches.enum";

const localizedString = Joi.object({
  uz: Joi.string().required().max(100),
  ru: Joi.string().optional().allow("", null).max(100),
  en: Joi.string().optional().allow("", null).max(100),
});

const addressSchema = Joi.object({
  address: Joi.string().required().max(255),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
});

export const createBranchValidator = Joi.object({
  name: localizedString.required(),
  address: addressSchema.required(),
  pickup_enabled: Joi.boolean().required(),
  delivery_enabled: Joi.boolean().optional(),
  notes: Joi.string().optional().allow(""),
});

export const updateBranchValidator = Joi.object({
  name: localizedString.optional(),
  address: addressSchema.optional(),
  pickup_enabled: Joi.boolean().optional(),
  delivery_enabled: Joi.boolean().optional(),
  notes: Joi.string().optional().allow(""),
}).min(1);

export const changeBranchStatusValidator = Joi.object({
  status: Joi.string()
    .valid(...Object.values(BranchStatus))
    .required(),
});
