import { BusinessType, ShopPlatform, ShopStatus } from "./shop.enum";

export interface IShop {
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
  };
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
  currency: {
    _id: string;
    name: string;
  };
  address: {
    address: string | null;
    long: number | null;
    lat: number | null;
  };
  plan_start_date: Date | null;
  plan_end_date: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IShopForm {
  name: string;
  business_type: BusinessType;
  platform: ShopPlatform;
  status: ShopStatus;
  owner: string;
  plan: string;
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
}
