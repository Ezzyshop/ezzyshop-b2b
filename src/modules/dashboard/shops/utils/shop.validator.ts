import Joi from "joi";
import { BusinessType, ShopPlatform, ShopStatus } from "./shop.enum";
import { IShop } from "./shop.interface";

export const shopFields: Record<
  keyof Omit<IShop, "createdAt" | "updatedAt" | "_id">,
  Joi.Schema
> = {
  owner: Joi.string().required().messages({
    "string.empty": "Foydalanuvchini tanlash shart",
    "any.required": "Foydalanuvchini tanlash shart",
  }),
  name: Joi.string().required().min(3).max(255).messages({
    "string.min": "Nomi kamida 3 ta belgidan iborat bo'lishi kerak",
    "string.max": "Nomi 255 ta belgidan kam bo'lishi kerak",
    "string.empty": "Nomi kiritilishi shart",
  }),
  business_type: Joi.string()
    .valid(...Object.values(BusinessType))
    .required()
    .messages({
      "string.empty": "Biznes turi kiritilishi shart",
      "any.only": "Noto'g'ri biznes turi",
    }),
  platform: Joi.string()
    .valid(...Object.values(ShopPlatform))
    .required()
    .messages({
      "string.empty": "Platforma kiritilishi shart",
    }),
  plan: Joi.string().required().messages({
    "string.empty": "Reja kiritilishi shart",
  }),
  logo: Joi.string().uri().allow(null).allow("").optional().messages({
    "string.uri": "Logo to'g'ri URL bo'lishi kerak",
  }),
  description: Joi.string().max(500).allow(null).allow("").optional().messages({
    "string.max": "Tavsif 500 ta belgidan kam bo'lishi kerak",
  }),
  telegram: Joi.object({
    token: Joi.string().required().messages({
      "any.required": "Telegram bot tokeni kiritilishi shart",
      "string.empty": "Telegram bot tokeni kiritilishi shart",
    }),
    menu_text: Joi.string().max(255).required().messages({
      "string.empty": "Menu nomi kiritilishi shart",
      "any.required": "Menu nomi kiritilishi shart",
    }),
    menu_url: Joi.string().uri().required().messages({
      "string.empty": "Menu manzili kiritilishi shart",
      "any.required": "Menu nomi kiritilishi shart",
    }),
  }),
  social_links: Joi.object({
    telegram: Joi.string().uri().allow(null).allow("").optional(),
    instagram: Joi.string().uri().allow(null).allow("").optional(),
    facebook: Joi.string().uri().allow(null).allow("").optional(),
    twitter: Joi.string().uri().allow(null).allow("").optional(),
    youtube: Joi.string().uri().allow(null).allow("").optional(),
  }),
  currency: Joi.string().required().messages({
    "string.empty": "Valyuta kiritilishi shart",
  }),
  address: Joi.object({
    address: Joi.string().max(255).allow(null).allow("").optional(),
    long: Joi.number().min(-180).max(180).allow(null).allow("").optional(),
    lat: Joi.number().min(-90).max(90).allow(null).allow("").optional(),
  }),
  plan_start_date: Joi.date().optional(),
  plan_end_date: Joi.date().optional(),
  status: Joi.string()
    .valid(...Object.values(ShopStatus))
    .optional(),
};

export const shopCreateSchema = Joi.object({
  owner: shopFields.owner,
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
  status: shopFields.status,
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
