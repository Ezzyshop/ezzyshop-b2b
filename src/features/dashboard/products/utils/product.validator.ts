import Joi from "joi";

export const createProductSchema = Joi.object({
  // 🔤 Localized name
  name: Joi.object({
    uz: Joi.string().min(1).max(100).required(),
    en: Joi.string().min(1).max(100).optional(),
    ru: Joi.string().min(1).max(100).optional(),
  }).required(),

  description: Joi.string().allow("").optional(),

  // 💰 Base price (active selling price)
  price: Joi.number().min(0).required(),

  // 💰 Optional original price before discount
  compare_at_price: Joi.number().min(0).allow(null).optional(),

  // 🖼 Images
  images: Joi.array().items(Joi.string().uri()).max(10).optional(),

  // 🗂 Categories
  categories: Joi.array()
    .items(
      Joi.string().length(24) // ObjectId
    )
    .optional(),

  // 🧬 Variants
  variants: Joi.array()
    .items(
      Joi.object({
        sku: Joi.string().max(64).required(),
        attributes: Joi.object()
          .pattern(Joi.string(), Joi.string().max(50))
          .required(),
        price: Joi.number().min(0).required(),
        quantity: Joi.number().integer().min(0).required(),
        image: Joi.string().uri().optional(),
      })
    )
    .optional(),

  isActive: Joi.boolean().default(true),
});
