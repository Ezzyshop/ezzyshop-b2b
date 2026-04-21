import Joi from "joi";
import {
  BusinessType,
  LanguageType,
  ShopPlatform,
  ShopStatus,
} from "./shop.enum";
import { IShop, ILanguage } from "./shop.interface";
import { PlansType } from "@/features/dashboard/plans/utils/plans.enum";

export const shopFields: Record<
  keyof Omit<IShop, "createdAt" | "updatedAt" | "_id">,
  Joi.Schema
> = {
  owner: Joi.string().optional().allow(null),
  name: Joi.string().required().min(3).max(255).messages({
    "string.min": "Nomi kamida 3 ta belgidan iborat bo'lishi kerak",
    "string.max": "Nomi 255 ta belgidan kam bo'lishi kerak",
    "string.empty": "Nomi kiritilishi shart",
  }),
  business_type: Joi.string()
    .valid(...Object.values(BusinessType))
    .required()
    .messages({
      "string.empty": "Do'kon turi kiritilishi shart",
      "any.only": "Noto'g'ri Do'kon turi",
    }),
  platform: Joi.string()
    .valid(...Object.values(ShopPlatform))
    .required()
    .messages({
      "string.empty": "Platforma kiritilishi shart",
    }),
  plan: Joi.string().optional(),
  logo: Joi.string().uri().optional().allow("").messages({
    "string.uri": "Logo to'g'ri URL bo'lishi kerak",
  }),
  description: Joi.string().max(500).optional().messages({
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
    menu_url: Joi.string().uri().optional(),
  }),
  social_links: Joi.object({
    telegram: Joi.string().uri().optional().allow(""),
    instagram: Joi.string().uri().optional().allow(""),
    facebook: Joi.string().uri().optional().allow(""),
    twitter: Joi.string().uri().optional().allow(""),
    youtube: Joi.string().uri().optional().allow(""),
  }),
  currency: Joi.string().required().messages({
    "string.empty": "Valyuta kiritilishi shart",
  }),
  address: Joi.object({
    address: Joi.string().max(255).optional(),
    long: Joi.number().min(-180).max(180).optional(),
    lat: Joi.number().min(-90).max(90).optional(),
  }),
  subscription_info: Joi.object({
    plan_type: Joi.string()
      .valid(...Object.values(PlansType))
      .optional(),
    plan_start_date: Joi.date().optional(),
    plan_end_date: Joi.date().optional(),
  }),
  status: Joi.string()
    .valid(...Object.values(ShopStatus))
    .optional(),
  languages: Joi.array()
    .items(
      Joi.object({
        type: Joi.string()
          .valid(...Object.values(LanguageType))
          .required(),
        is_main: Joi.boolean().required(),
      })
    )
    .custom((value: ILanguage[], helpers) => {
      const mainLanguages = value.filter(
        (lang: ILanguage) => lang.is_main === true
      );
      if (mainLanguages.length !== 1) {
        return helpers.error("languages.exactly_one_main");
      }
      return value;
    })
    .messages({
      "languages.exactly_one_main": "Kamida bitta til asosiy bo'lishi kerak",
    }),
  brand_color: Joi.string().optional().allow(""),
  telegram_group_id: Joi.number().optional().allow(null),
};

export const shopCreateSchema = Joi.object({
  owner: shopFields.owner,
  name: shopFields.name,
  business_type: shopFields.business_type,
  platform: shopFields.platform,
  logo: shopFields.logo,
  description: shopFields.description,
  telegram: shopFields.telegram,
  social_links: shopFields.social_links,
  currency: shopFields.currency,
  address: shopFields.address,
  status: shopFields.status,
  languages: shopFields.languages,
  telegram_group_id: shopFields.telegram_group_id,
});

export const shopUpdateSchema = Joi.object({
  name: shopFields.name,
  logo: shopFields.logo,
  description: shopFields.description,
  telegram: shopFields.telegram,
  social_links: shopFields.social_links,
  currency: shopFields.currency,
  address: shopFields.address,
  languages: shopFields.languages,
  telegram_group_id: shopFields.telegram_group_id,
});

export const shopUpdatePlanSchema = Joi.object({
  plan: shopFields.plan,
  type: Joi.string()
    .valid(...Object.values(PlansType))
    .optional(),
});

export const updateMyShopSchema = Joi.object({
  name: shopFields.name,
  logo: shopFields.logo,
  description: shopFields.description,
  telegram: {
    menu_text: Joi.string().max(255).required(),
  },
  social_links: shopFields.social_links,
  currency: shopFields.currency,
  address: shopFields.address,
  languages: shopFields.languages,
  brand_color: shopFields.brand_color,
  telegram_group_id: shopFields.telegram_group_id,
});
