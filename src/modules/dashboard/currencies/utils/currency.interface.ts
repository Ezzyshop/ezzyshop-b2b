import { CurrencyStatus } from "./currency.enum";

export interface ICurrency {
  _id: string;
  name: string;
  symbol: string;
  status: CurrencyStatus;
  createdAt: Date;
  updatedAt: Date;
}
