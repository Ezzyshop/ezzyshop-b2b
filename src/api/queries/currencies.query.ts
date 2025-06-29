import { ICurrency } from "@/modules/dashboard/currencies/utils/currency.interface";
import { api } from "../axios";
import { IResponse } from "../utils/axios.interface";

export const getCurrenciesQueryFn = async (): Promise<IResponse<ICurrency[]>> =>
  await api.get("/currencies").then((res) => res.data);
