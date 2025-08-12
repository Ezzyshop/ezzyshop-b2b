import { api } from "@/api/axios";
import { IPaginatedResponse } from "../utils/axios.interface";
import { IDeliveryMethod } from "@/features/dashboard/delivery-methods/utils/delivery-methods.interface";
import { TObject } from "@/hooks";

export const getDeliveryMethodsQueryFn = async (
  shopId: string,
  filters?: TObject
): Promise<IPaginatedResponse<IDeliveryMethod>> =>
  api
    .get(`/delivery-methods/${shopId}`, { params: filters })
    .then((res) => res.data);

export const getDeliveryMethodQueryFn = async (
  id: string,
  shopId: string
): Promise<IDeliveryMethod> =>
  api.get(`/delivery-methods/${shopId}/${id}`).then((res) => res.data);
