import Joi from "joi";
import {
  DeliveryMethodStatus,
  DeliveryMethodDeliveryType,
  DeliveryMethodType,
  DeliveryMethodEstimatedDayPrefix,
} from "./delivery-methods.enum";

export const deliveryMethodFields = {
  name: {
    uz: Joi.string()
      .optional()
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
  },
  price: Joi.number()
    .required()
    .min(0)
    .messages({ "number.min": "Price must be greater than 0" }),
  currency: Joi.string()
    .required()
    .messages({ "string.empty": "Currency is required" }),
  estimated_days: Joi.number()
    .required()
    .min(1)
    .messages({ "number.min": "Estimated days must be greater than 0" }),
  pickup_location: Joi.string().optional().max(100).messages({
    "string.max": "Pickup location must be less than 100 characters",
  }),
  status: Joi.string()
    .required()
    .valid(DeliveryMethodStatus.Active, DeliveryMethodStatus.Inactive)
    .messages({ "string.valid": "Status must be either ACTIVE or INACTIVE" }),
  deliveryType: Joi.string()
    .optional()
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
  type: Joi.string()
    .required()
    .valid(...Object.values(DeliveryMethodType)),
  estimated_day_prefix: Joi.string()
    .required()
    .valid(...Object.values(DeliveryMethodEstimatedDayPrefix)),
};

export const deliveryMethodSchema = Joi.object({
  name: deliveryMethodFields.name,
  price: deliveryMethodFields.price,
  currency: deliveryMethodFields.currency,
  estimated_days: deliveryMethodFields.estimated_days,
  pickup_location: deliveryMethodFields.pickup_location,
  deliveryType: deliveryMethodFields.deliveryType,
  initial_km: deliveryMethodFields.initial_km,
  initial_km_price: deliveryMethodFields.initial_km_price,
  every_km_price: deliveryMethodFields.every_km_price,
  min_order_price: deliveryMethodFields.min_order_price,
  type: deliveryMethodFields.type,
  estimated_day_prefix: deliveryMethodFields.estimated_day_prefix,
});

export const changeDeliveryMethodStatusValidator = Joi.object({
  status: deliveryMethodFields.status,
});
