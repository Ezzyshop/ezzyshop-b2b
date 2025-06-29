import { CurrencyStatus } from "./currency.enum";

export interface ICurrency {
  _id: string;
  name: string;
  symbol: string;
  status: CurrencyStatus;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type ICreateCurrencyForm = Omit<
  ICurrency,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;
