import Joi from "joi";
import { DeliveryMethodStatus } from "./devliery-methods.enum";

export const deliveryMethodFields = {
  name: {
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
};

export const deliveryMethodSchema = Joi.object({
  name: deliveryMethodFields.name,
  price: deliveryMethodFields.price,
  currency: deliveryMethodFields.currency,
  estimated_days: deliveryMethodFields.estimated_days,
  pickup_location: deliveryMethodFields.pickup_location,
});

export const changeDeliveryMethodStatusValidator = Joi.object({
  status: deliveryMethodFields.status,
});
