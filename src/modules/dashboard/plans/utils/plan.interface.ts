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
  createdAt: Date;
  updatedAt: Date;
}
