import { DeliveryMethodStatus } from "./devliery-methods.enum";

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
