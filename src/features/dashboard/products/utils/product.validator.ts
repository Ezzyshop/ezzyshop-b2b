import Joi from "joi";
import { ProductStatus } from "./product.enum";

export const createProductSchema = Joi.object({
  name: Joi.object({
    uz: Joi.string().max(100).required().messages({
      "any.required": "dashboard.products.enter_name",
      "string.empty": "dashboard.products.enter_name",
    }),
    en: Joi.string().max(100).optional(),
    ru: Joi.string().max(100).optional(),
  }).required(),

  description: Joi.object({
    uz: Joi.string().max(500).optional(),
    en: Joi.string().max(500).optional(),
    ru: Joi.string().max(500).optional(),
  }).optional(),

  main_image: Joi.string().uri().optional(),
  categories: Joi.array().items(Joi.string().length(24)).optional(),
  variants: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().optional(),
        sku: Joi.string().max(64).optional().allow(""),
        attributes: Joi.object()
          .pattern(Joi.string(), Joi.string().max(50))
          .required(),
        price: Joi.number().min(0).required(),
        compare_at_price: Joi.number().optional().allow("").allow(null),
        quantity: Joi.number().integer().min(0).required(),
        images: Joi.array().items(Joi.string().uri()).max(10).optional(),
      })
    )
    .optional(),

  status: Joi.string().valid(ProductStatus.ACTIVE, ProductStatus.INACTIVE),
  delivery_time: Joi.number().min(0).optional().allow(null).default(null),
});
