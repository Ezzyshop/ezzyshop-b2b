import { ICurrency } from "@/modules/moderator/currencies/utils/currency.interface";
import { api } from "../axios";
import { IResponse } from "../utils/axios.interface";

export const getCurrenciesQueryFn = async (): Promise<IResponse<ICurrency[]>> =>
  await api.get("/currencies").then((res) => res.data);

export const getCurrencyQueryFn = async (
  id: string
): Promise<IResponse<ICurrency>> =>
  await api.get(`/currencies/${id}`).then((res) => res.data);
