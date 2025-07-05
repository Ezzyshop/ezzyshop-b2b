import { PlanStatus } from "./plan.enum";

export interface IPlan {
  _id: string;
  name: string;
  description: string;
  price: number;
  products: {
    max: number;
  };
  categories: {
    max: number;
  };
  orders: {
    max: number;
  };
  status: PlanStatus;
  order: number;
  annual_price: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type IPlanForm = Omit<IPlan, "createdAt" | "updatedAt" | "_id" | "__v">;
