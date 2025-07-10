import {
  DeliveryMethodEstimatedDayPrefix,
  DeliveryMethodDeliveryType,
  DeliveryMethodStatus,
  DeliveryMethodType,
} from "./delivery-methods.enum";

export interface IDeliveryMethod {
  _id: string;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  shop: {
    _id: string;
    name: string;
  };
  price: number;
  currency: {
    _id: string;
    name: string;
    symbol: string;
  };
  estimated_days: number;
  pickup_location: string | null;
  deliveryType: DeliveryMethodDeliveryType | null;
  initial_km: number | null;
  initial_km_price: number | null;
  every_km_price: number | null;
  min_order_price: number | null;
  type: DeliveryMethodType;
  estimated_day_prefix: DeliveryMethodEstimatedDayPrefix;
  status: DeliveryMethodStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IDeliveryMethodForm
  extends Omit<
    IDeliveryMethod,
    "shop" | "currency" | "createdAt" | "updatedAt" | "_id" | "status"
  > {
  currency: string;
}
