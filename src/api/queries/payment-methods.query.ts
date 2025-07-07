import { IPaymentMethod } from "@/features/dashboard/payment-methods/utils/payment-methods.interface";
import { api } from "../axios";
import { IResponse } from "../utils/axios.interface";

export const getPaymentMethodsQueryFn = async (
  shopId: string
): Promise<IResponse<IPaymentMethod[]>> =>
  await api.get(`/payment-methods/${shopId}`).then((res) => res.data);
