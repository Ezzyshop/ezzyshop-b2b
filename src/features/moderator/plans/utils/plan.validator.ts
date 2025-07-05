import Joi from "joi";
import { PlanStatus } from "./plan.enum";
import { IPlan } from "./plan.interface";

export const planFields: Record<
  keyof Omit<IPlan, "createdAt" | "updatedAt" | "_id" | "__v">,
  Joi.Schema
> = {
  name: Joi.string().required().max(255).messages({
    "string.empty": "Name is required",
    "string.max": "Name must be less than 255 characters long",
  }),
  description: Joi.object({
    uz: Joi.string().required().max(500).messages({
      "string.empty": "Description is required",
      "string.max": "Description must be less than 500 characters long",
    }),
    ru: Joi.string().optional().max(500).messages({
      "string.max": "Description must be less than 500 characters long",
    }),
    en: Joi.string().optional().max(500).messages({
      "string.max": "Description must be less than 500 characters long",
    }),
  }),
  price: Joi.number().required().min(0).messages({
    "number.empty": "Price is required",
    "number.min": "Price must be greater than 0",
  }),
  products: Joi.object({
    max: Joi.number().required(),
  }),
  categories: Joi.object({
    max: Joi.number().required(),
  }),
  orders: Joi.object({
    max: Joi.number().required(),
  }),
  status: Joi.string()
    .required()
    .valid(PlanStatus.Active, PlanStatus.Inactive)
    .messages({
      "string.empty": "Status is required",
      "any.only": "Status must be either Active or Inactive",
    }),
  order: Joi.number().required().min(0).messages({
    "number.empty": "Order is required",
    "number.min": "Order must be greater than 0",
  }),
  annual_price: Joi.number().required().min(0).messages({
    "number.empty": "Annual price is required",
    "number.min": "Annual price must be greater than 0",
  }),
};

export const createPlanValidator = Joi.object(planFields);

export const updatePlanValidator = Joi.object(planFields);

export const changePlanStatusValidator = Joi.object({
  status: planFields.status,
});
