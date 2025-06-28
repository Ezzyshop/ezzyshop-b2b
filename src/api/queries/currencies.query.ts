import { api } from "../axios";
import { IResponse } from "../utils/axios.interface";

export enum CurrencyStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}

export interface ICurrency {
  _id: string;
  name: string;
  symbol: string;
  status: CurrencyStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const getCurrencies = async (): Promise<IResponse<ICurrency[]>> =>
  await api.get("/currencies").then((res) => res.data);
