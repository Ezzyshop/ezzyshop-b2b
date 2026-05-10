import Joi from "joi";
import {
  PaymentMethodStatus,
  PaymentMethodType,
  PaymentProviderMode,
} from "./payment-method.enum";

export const createPaymentMethodValidator = Joi.object({
  name: Joi.object({
    uz: Joi.string().required().max(100),
    ru: Joi.string().optional().max(100).allow(""),
    en: Joi.string().optional().max(100).allow(""),
  }).required(),
  type: Joi.string()
    .required()
    .valid(...Object.values(PaymentMethodType)),
  instructions: Joi.object({
    uz: Joi.string().optional().allow("", null),
    ru: Joi.string().optional().allow("", null),
    en: Joi.string().optional().allow("", null),
  }),
  status: Joi.string()
    .required()
    .valid(PaymentMethodStatus.Active, PaymentMethodStatus.Inactive),
});

export const editPaymentMethodValidator = Joi.object({
  name: Joi.object({
    uz: Joi.string().required().max(100),
    ru: Joi.string().optional().max(100).allow(""),
    en: Joi.string().optional().max(100).allow(""),
  }).required(),
  type: Joi.string()
    .required()
    .valid(...Object.values(PaymentMethodType)),
  instructions: Joi.object({
    uz: Joi.string().optional().allow("", null),
    ru: Joi.string().optional().allow("", null),
    en: Joi.string().optional().allow("", null),
  }),
});

export const editClickConfigValidator = Joi.object({
  service_id: Joi.string()
    .required()
    .pattern(/^\d+$/)
    .messages({
      "string.empty": "dashboard.payment-methods.service_id_required",
      "string.pattern.base": "dashboard.payment-methods.service_id_pattern",
    }),
  merchant_id: Joi.string()
    .required()
    .pattern(/^\d+$/)
    .messages({
      "string.empty": "dashboard.payment-methods.merchant_id_required",
      "string.pattern.base": "dashboard.payment-methods.merchant_id_pattern",
    }),
  merchant_user_id: Joi.string()
    .required()
    .messages({
      "string.empty": "dashboard.payment-methods.merchant_user_id_required",
    }),
  secret_key: Joi.string().required().messages({
    "string.empty": "dashboard.payment-methods.secret_key_required",
  }),
  mode: Joi.string()
    .required()
    .valid(...Object.values(PaymentProviderMode)),
});

export const editClickTelegramConfigValidator = Joi.object({
  telegram_provider_token: Joi.string().required().messages({
    "string.empty": "dashboard.payment-methods.telegram_provider_token_required",
  }),
});

export const editPaymeConfigValidator = Joi.object({
  merchant_id: Joi.string().required().messages({
    "string.empty": "dashboard.payment-methods.merchant_id_required",
  }),
  test_key: Joi.string().optional().allow(""),
  prod_key: Joi.string().optional().allow(""),
  mode: Joi.string()
    .required()
    .valid(...Object.values(PaymentProviderMode)),
}).custom((value, helpers) => {
  const requiredKey =
    value.mode === PaymentProviderMode.Production ? "prod_key" : "test_key";
  if (!value[requiredKey]) {
    return helpers.error("any.required", { label: requiredKey });
  }
  return value;
});

export const updatePaymentMethodStatusValidator = Joi.object({
  status: Joi.string()
    .required()
    .valid(PaymentMethodStatus.Active, PaymentMethodStatus.Inactive),
});
