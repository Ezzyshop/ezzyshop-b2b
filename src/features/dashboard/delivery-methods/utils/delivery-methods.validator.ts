import Joi from "joi";
import {
  DeliveryMethodDeliveryType,
  DeliveryMethodEstimatedDayPrefix,
  DeliveryMethodStatus,
} from "./delivery-methods.enum";
import { IDeliveryMethod } from "./delivery-methods.interface";

export const deliveryMethodFields: Record<
  keyof Omit<IDeliveryMethod, "shop" | "createdAt" | "updatedAt" | "_id">,
  Joi.Schema
> = {
  name: Joi.object({
    uz: Joi.string()
      .required()
      .max(100)
      .messages({ "string.max": "Name must be less than 100 characters" }),
    ru: Joi.string()
      .optional()
      .max(100)
      .messages({ "string.max": "Name must be less than 100 characters" }),
    en: Joi.string()
      .optional()
      .max(100)
      .messages({ "string.max": "Name must be less than 100 characters" }),
  })
    .required()
    .messages({ "object.base": "Name is required" }),

  price: Joi.number()
    .min(0)
    .required()
    .messages({ "number.min": "Price must be greater than 0" }),
  estimated_days: Joi.number()
    .min(0)
    .required()
    .messages({ "number.min": "Estimated days must be greater than 0" }),
  status: Joi.string()
    .required()
    .valid(DeliveryMethodStatus.Active, DeliveryMethodStatus.Inactive)
    .messages({ "string.valid": "Status must be either ACTIVE or INACTIVE" }),
  deliveryType: Joi.string()
    .required()
    .valid(...Object.values(DeliveryMethodDeliveryType)),
  initial_km: Joi.number()
    .optional()
    .min(0)
    .messages({ "number.min": "Initial km must be greater than 0" }),
  initial_km_price: Joi.number()
    .optional()
    .min(0)
    .messages({ "number.min": "Initial km price must be greater than 0" }),
  every_km_price: Joi.number()
    .optional()
    .min(0)
    .messages({ "number.min": "Every km price must be greater than 0" }),
  min_order_price: Joi.number()
    .optional()
    .min(0)
    .messages({ "number.min": "Min order price must be greater than 0" }),
  estimated_day_prefix: Joi.string()
    .required()
    .valid(...Object.values(DeliveryMethodEstimatedDayPrefix)),
};

export const createDeliveryMethodValidator = Joi.object({
  name: deliveryMethodFields.name,
  price: deliveryMethodFields.price,
  estimated_days: deliveryMethodFields.estimated_days,
  estimated_day_prefix: deliveryMethodFields.estimated_day_prefix,
  status: deliveryMethodFields.status.optional(),
  deliveryType: deliveryMethodFields.deliveryType,
  initial_km: deliveryMethodFields.initial_km,
  initial_km_price: deliveryMethodFields.initial_km_price,
  every_km_price: deliveryMethodFields.every_km_price,
  min_order_price: deliveryMethodFields.min_order_price,
}).when(
  Joi.object({
    deliveryType: Joi.valid(DeliveryMethodDeliveryType.Fixed),
  }).unknown(),
  {
    then: Joi.object({
      price: deliveryMethodFields.price.required(),
    }),
  }
);

export const updateDeliveryMethodValidator = Joi.object({
  name: deliveryMethodFields.name,
  price: deliveryMethodFields.price,
  estimated_days: deliveryMethodFields.estimated_days,
  estimated_day_prefix: deliveryMethodFields.estimated_day_prefix,
  status: deliveryMethodFields.status.optional(),
  deliveryType: deliveryMethodFields.deliveryType,
  initial_km: deliveryMethodFields.initial_km,
  initial_km_price: deliveryMethodFields.initial_km_price,
  every_km_price: deliveryMethodFields.every_km_price,
  min_order_price: deliveryMethodFields.min_order_price,
}).when(
  Joi.object({
    deliveryType: Joi.valid(DeliveryMethodDeliveryType.Fixed),
  }).unknown(),
  {
    then: Joi.object({
      price: deliveryMethodFields.price.required(),
    }),
  }
);

export const changeDeliveryMethodStatusValidator = Joi.object({
  status: deliveryMethodFields.status,
});
