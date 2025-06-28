import Joi from "joi";
import { BusinessType, ShopPlatform } from "./shop.enum";
import { IShop } from "./shop.interface";

export const shopFields: Record<
  keyof Omit<IShop, "owner" | "createdAt" | "updatedAt" | "status">,
  Joi.Schema
> = {
  name: Joi.string().required().min(3).max(255).messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be less than 255 characters long",
    "string.empty": "Name is required",
  }),
  business_type: Joi.string()
    .valid(...Object.values(BusinessType))
    .required()
    .messages({
      "string.empty": "Business type is required",
      "any.only": "Invalid business type",
    }),
  platform: Joi.string()
    .valid(...Object.values(ShopPlatform))
    .required()
    .messages({
      "string.empty": "Platform is required",
    }),
  plan: Joi.string().required().messages({
    "string.empty": "Plan is required",
  }),
  logo: Joi.string().uri().allow(null).allow("").optional().messages({
    "string.uri": "Logo must be a valid URL",
  }),
  description: Joi.string().max(500).allow(null).allow("").optional().messages({
    "string.max": "Description must be less than 500 characters long",
  }),
  telegram: Joi.object({
    token: Joi.string().allow(null).allow("").optional(),
    menu_text: Joi.string().max(255).allow(null).allow("").optional(),
    menu_url: Joi.string().uri().allow(null).allow("").optional(),
  }),
  social_links: Joi.object({
    telegram: Joi.string().uri().allow(null).allow("").optional(),
    instagram: Joi.string().uri().allow(null).allow("").optional(),
    facebook: Joi.string().uri().allow(null).allow("").optional(),
    twitter: Joi.string().uri().allow(null).allow("").optional(),
    youtube: Joi.string().uri().allow(null).allow("").optional(),
  }),
  currency: Joi.string().required().messages({
    "string.empty": "Currency is required",
  }),
  address: Joi.object({
    address: Joi.string().max(255).allow(null).allow("").optional(),
    long: Joi.number().min(-180).max(180).allow(null).allow("").optional(),
    lat: Joi.number().min(-90).max(90).allow(null).allow("").optional(),
  }),
  plan_start_date: Joi.date().optional(),
  plan_end_date: Joi.date().optional(),
};

export const shopCreateSchema = Joi.object({
  name: shopFields.name,
  business_type: shopFields.business_type,
  platform: shopFields.platform,
  plan: shopFields.plan,
  logo: shopFields.logo,
  description: shopFields.description,
  telegram: shopFields.telegram,
  social_links: shopFields.social_links,
  currency: shopFields.currency,
  address: shopFields.address,
});

export const shopUpdateSchema = Joi.object({
  name: shopFields.name,
  logo: shopFields.logo,
  description: shopFields.description,
  telegram: shopFields.telegram,
  social_links: shopFields.social_links,
  currency: shopFields.currency,
  address: shopFields.address,
});

export const shopUpdatePlanSchema = Joi.object({
  plan: shopFields.plan,
});
