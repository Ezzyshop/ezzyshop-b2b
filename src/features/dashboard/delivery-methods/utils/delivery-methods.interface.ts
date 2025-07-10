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
  pickup_location: string | undefined;
  deliveryType: DeliveryMethodDeliveryType | undefined;
  initial_km: number | undefined;
  initial_km_price: number | undefined;
  every_km_price: number | undefined;
  min_order_price: number | undefined;
  type: DeliveryMethodType;
  estimated_day_prefix: DeliveryMethodEstimatedDayPrefix | undefined;
  status: DeliveryMethodStatus;
  createdAt: string;
  updatedAt: string;
}

export type IDeliveryMethodForm = Omit<
  IDeliveryMethod,
  "shop" | "currency" | "createdAt" | "updatedAt" | "_id" | "status"
>;
