import { ICreateCurrencyForm } from "@/modules/moderator/currencies/utils/currency.interface";
import { api } from "../axios";

export const createCurrencyMutationFn = (data: ICreateCurrencyForm) =>
  api.post("/currencies", data).then((res) => res.data);

export const updateCurrencyMutationFn = (
  id: string,
  data: ICreateCurrencyForm
) => api.put(`/currencies/${id}`, data).then((res) => res.data);
