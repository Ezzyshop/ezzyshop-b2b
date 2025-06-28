import { api } from "../axios";
import { IResponse } from "../utils/axios.interface";

export enum PlanStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}

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

export const getPlans = async (): Promise<IResponse<IPlan[]>> =>
  await api.get("/plans").then((res) => res.data);
