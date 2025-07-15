import { PlansType } from "@/features/dashboard/plans/utils/plans.enum";
import {
  BusinessType,
  LanguageType,
  ShopPlatform,
  ShopStatus,
} from "./shop.enum";

export interface IShop {
  _id: string;
  name: string;
  business_type: BusinessType;
  platform: ShopPlatform;
  status: ShopStatus;
  owner: {
    _id: string;
    full_name: string;
  };
  plan: {
    _id: string;
    name: string;
    order: number;
  };
  logo?: string;
  description?: string;
  telegram: {
    _id: string;
    menu_text?: string;
  };
  social_links: {
    telegram?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  currency: {
    _id: string;
    symbol: string;
  };
  address: {
    address?: string;
    long?: number;
    lat?: number;
  };
  subscription_info: {
    plan_type: PlansType;
    plan_start_date?: Date;
    plan_end_date?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  languages: ILanguage[];
}

export interface ILanguage {
  type: LanguageType;
  is_main: boolean;
}

export interface IShopForm {
  name: string;
  business_type: BusinessType;
  platform: ShopPlatform;
  status: ShopStatus;
  owner: string;
  logo?: string;
  description?: string;
  plan: string;
  telegram: {
    token?: string;
    menu_text?: string;
    menu_url?: string;
  };
  social_links: {
    telegram?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  currency: string;
  address: {
    address?: string;
    long?: number;
    lat?: number;
  };
  languages: ILanguage[];
}

export interface IShopUpdateForm {
  name: string;
  logo?: string;
  description?: string;
  telegram: {
    token?: string;
    menu_text?: string;
    menu_url?: string;
  };
  social_links: {
    telegram?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  currency: string;
  address: {
    address?: string;
    long?: number;
    lat?: number;
  };
  languages: ILanguage[];
}

export interface IMyShopUpdateForm extends Omit<IShopUpdateForm, "telegram"> {
  telegram: {
    menu_text?: string;
  };
}
