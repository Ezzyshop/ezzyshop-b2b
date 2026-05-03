import Joi from "joi";
import { IPaymentMethod } from "./payment-methods.interface";
import { PaymentMethodStatus, PaymentMethodType } from "./payment-method.enum";

const paymentMethodFields: Record<
  keyof Omit<IPaymentMethod, "shop" | "_id">,
  Joi.Schema
> = {
  name: Joi.object({
    uz: Joi.string().required().max(100).messages({
      "string.empty": "Name is required",
      "string.max": "Name must be less than 100 characters",
    }),
    ru: Joi.string().optional().max(100).messages({
      "string.max": "Name must be less than 100 characters",
    }),
    en: Joi.string().optional().max(100).messages({
      "string.max": "Name must be less than 100 characters",
    }),
  })
    .required()
    .messages({
      "object.base": "Name is required",
    }),
  type: Joi.string()
    .required()
    .valid(...Object.values(PaymentMethodType))
    .messages({
      "string.empty": "Type is required",
      "string.valid": "Invalid type",
    }),
  click_config: Joi.object({
    merchant_id: Joi.string()
      .required()
      .pattern(/^\d{6}$/)
      .messages({
        "string.empty": "Merchant ID is required",
        "string.pattern.base": "Merchant ID must be 6 digits",
      }),
    service_id: Joi.string()
      .required()
      .pattern(/^\d{6}$/)
      .messages({
        "string.empty": "Service ID is required",
        "string.pattern.base": "Service ID must be 6 digits",
      }),
    merchant_user_id: Joi.string().optional(),
    secret_key: Joi.string().required(),
  }),
  instructions: Joi.object({
    uz: Joi.string().optional(),
    ru: Joi.string().optional(),
    en: Joi.string().optional(),
  }),
  status: Joi.string()
    .required()
    .valid(PaymentMethodStatus.Active, PaymentMethodStatus.Inactive),
};

export const createPaymentMethodValidator = Joi.object({
  name: paymentMethodFields.name,
  type: paymentMethodFields.type,
  instructions: paymentMethodFields.instructions,
  status: paymentMethodFields.status,
});

export const editPaymentMethodValidator = Joi.object({
  name: paymentMethodFields.name,
  type: paymentMethodFields.type,
  instructions: paymentMethodFields.instructions,
});

export const editClickPaymentMethodConfigValidator = Joi.object({
  telegram_provider_token: Joi.string().optional().allow(null, ""),
});

export const updatePaymentMethodStatusValidator = Joi.object({
  status: Joi.string()
    .required()
    .valid(PaymentMethodStatus.Active, PaymentMethodStatus.Inactive)
    .messages({
      "any.required": "dashboard.payment-methods.status_required",
      "string.empty": "dashboard.payment-methods.status_required",
      "string.valid": "dashboard.payment-methods.status_invalid",
    }),
});
