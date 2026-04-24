import Joi from "joi";
import { ICategory } from "./category.interface";
import { CategoryStatus } from "./category.enum";

export const categoryFields: Record<
  keyof Omit<
    ICategory,
    "createdAt" | "updatedAt" | "shop" | "product_count" | "_id" | "order"
  >,
  Joi.Schema
> = {
  name: Joi.object({
    ru: Joi.string().allow().optional(),
    en: Joi.string().allow().optional(),
    uz: Joi.string().required().not().empty().messages({
      "any.required": "dashboard.categories.enter_name",
    }),
  }),
  image: Joi.string().uri().required().messages({
    "any.required": "dashboard.categories.enter_image",
  }),
  status: Joi.string()
    .valid(...Object.values(CategoryStatus))
    .required(),
  is_popular: Joi.boolean().required(),
};

export const categoryFormValidator = Joi.object({
  name: categoryFields.name,
  image: categoryFields.image,
  is_popular: categoryFields.is_popular,
});
