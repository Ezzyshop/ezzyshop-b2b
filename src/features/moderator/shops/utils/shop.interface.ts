import { PlansType } from "@/features/dashboard/plans/utils/plans.enum";
import {
  BusinessType,
  HomepageLayout,
  LanguageType,
  ShopPlatform,
  ShopStatus,
} from "./shop.enum";
import { TelegramBusinessType } from "@/features/dashboard/telegram/utils/telegram.enum";

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
  telegram?: {
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
  brand_color?: string;
  work_hours_indicator_color?: string;
  telegram_group_id?: string;
  work_hours?: IWorkHours;
  eta?: IShopEta;
  homepage_layout?: HomepageLayout;
  setup?: boolean;
}

export interface ILanguage {
  type: LanguageType;
  is_main: boolean;
}

export interface IWorkHourDay {
  is_open: boolean;
  open: string;
  close: string;
}

export interface IWorkHours {
  monday: IWorkHourDay;
  tuesday: IWorkHourDay;
  wednesday: IWorkHourDay;
  thursday: IWorkHourDay;
  friday: IWorkHourDay;
  saturday: IWorkHourDay;
  sunday: IWorkHourDay;
}

export interface IShopEta {
  min: number;
  max: number;
}

export interface IShopForm {
  name: string;
  business_type: BusinessType;
  platform: ShopPlatform;
  status: ShopStatus;
  owner: string;
  logo?: string;
  description?: string;
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
  brand_color?: string;
  telegram_group_id?: string;
}

export interface IShopUpdateForm {
  name: string;
  logo?: string;
  description?: string;
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
  brand_color?: string;
  work_hours_indicator_color?: string;
  telegram_group_id?: string;
  work_hours?: IWorkHours;
  eta?: IShopEta;
  homepage_layout?: HomepageLayout;
}

export interface IShopTelegramForm {
  token: string;
  menu_text: string;
  business_type: TelegramBusinessType;
}
