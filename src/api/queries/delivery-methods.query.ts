import { api } from "@/api/axios";
import { IPaginatedResponse } from "../utils/axios.interface";
import { IDeliveryMethod } from "@/features/dashboard/delivery-methods/utils/delivery-methods.interface";

export const getDeliveryMethodsQueryFn = async (
  shopId: string
): Promise<IPaginatedResponse<IDeliveryMethod>> =>
  api.get(`/delivery-methods/${shopId}`).then((res) => res.data);

export const getDeliveryMethodQueryFn = async (
  id: string,
  shopId: string
): Promise<IDeliveryMethod> =>
  api.get(`/delivery-methods/${shopId}/${id}`).then((res) => res.data);
