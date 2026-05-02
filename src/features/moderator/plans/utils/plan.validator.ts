import Joi from "joi";
import { PlanStatus } from "./plan.enum";

const featureValueSchema = Joi.object({
  enabled: Joi.boolean().optional().default(false),
  limit: Joi.number().integer().min(-1).default(-1).messages({
    "number.min": "Limit -1 (cheksiz) yoki musbat son bo'lishi kerak",
    "number.base": "Limit son bo'lishi kerak",
  }),
});

const planBaseSchema = {
  name: Joi.string().required().max(255).messages({
    "string.empty": "Nomi majburiy",
    "string.max": "Nomi 255 ta belgidan oshmasligi kerak",
  }),
  description: Joi.object({
    uz: Joi.string().required().max(500).messages({
      "string.empty": "Tavsif (UZ) majburiy",
      "string.max": "Tavsif 500 ta belgidan oshmasligi kerak",
    }),
    ru: Joi.string().optional().allow("").max(500),
    en: Joi.string().optional().allow("").max(500),
  }),
  price: Joi.number().required().min(0).messages({
    "number.base": "Narx majburiy",
    "number.min": "Narx 0 dan katta yoki teng bo'lishi kerak",
  }),
  annual_price: Joi.number().required().min(0).messages({
    "number.base": "Yillik narx majburiy",
    "number.min": "Yillik narx 0 dan katta yoki teng bo'lishi kerak",
  }),
  features: Joi.object()
    .pattern(Joi.string().optional(), featureValueSchema)
    .required()
    .messages({ "object.base": "Xususiyatlar ob'ekt bo'lishi kerak" }),
  status: Joi.string()
    .valid(PlanStatus.Active, PlanStatus.Inactive)
    .required()
    .messages({
      "string.empty": "Holati majburiy",
      "any.only": "Holat noto'g'ri",
    }),
  order: Joi.number().required().min(0).messages({
    "number.base": "Tartib raqami majburiy",
    "number.min": "Tartib raqami 0 dan katta yoki teng bo'lishi kerak",
  }),
};

export const createPlanValidator = Joi.object(planBaseSchema).options({
  stripUnknown: true,
});

export const updatePlanValidator = Joi.object(planBaseSchema).options({
  stripUnknown: true,
});

export const changePlanStatusValidator = Joi.object({
  status: planBaseSchema.status,
});
