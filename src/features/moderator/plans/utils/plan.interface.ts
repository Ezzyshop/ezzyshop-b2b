import { PlanStatus } from "./plan.enum";

export interface IFeatureValue {
  enabled: boolean;
  limit: number; // -1 = unlimited
}

export interface IPlan {
  _id: string;
  name: string;
  description: {
    uz: string;
    ru: string;
    en: string;
  };
  price: number;
  annual_price: number;
  features: Record<string, IFeatureValue>;
  status: PlanStatus;
  order: number;
  subscriptions: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type IPlanForm = Omit<IPlan, "createdAt" | "updatedAt" | "_id" | "__v" | "subscriptions">;
