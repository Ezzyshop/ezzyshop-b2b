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
  logo: string | null;
  description: string | null;
  telegram: {
    _id: string;
    menu_text: string | null;
  };
  social_links: {
    telegram: string | null;
    instagram: string | null;
    facebook: string | null;
    twitter: string | null;
    youtube: string | null;
  };
  currency: {
    _id: string;
    symbol: string;
  };
  address: {
    address: string | null;
    long: number | null;
    lat: number | null;
  };
  subscription_info: {
    plan_type: PlansType;
    plan_start_date: Date | null;
    plan_end_date: Date | null;
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
  logo: string | null;
  description: string | null;
  plan: string;
  telegram: {
    token: string | null;
    menu_text: string | null;
    menu_url: string | null;
  };
  social_links: {
    telegram: string | null;
    instagram: string | null;
    facebook: string | null;
    twitter: string | null;
    youtube: string | null;
  };
  currency: string;
  address: {
    address: string | null;
    long: number | null;
    lat: number | null;
  };
  languages: ILanguage[];
}

export interface IShopUpdateForm {
  name: string;
  logo: string | null;
  description: string | null;
  telegram: {
    token: string | null;
    menu_text: string | null;
    menu_url: string | null;
  };
  social_links: {
    telegram: string | null;
    instagram: string | null;
    facebook: string | null;
    twitter: string | null;
    youtube: string | null;
  };
  currency: string;
  address: {
    address: string | null;
    long: number | null;
    lat: number | null;
  };
  languages: ILanguage[];
}

export interface IMyShopUpdateForm extends Omit<IShopUpdateForm, "telegram"> {
  telegram: {
    menu_text: string | null;
  };
}
