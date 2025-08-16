import { IOrderResponse } from "@/features/dashboard/orders/utils/order.interface";
import { api } from "../axios";
import { IPaginatedResponse, IResponse } from "../utils/axios.interface";
import { TObject } from "@/hooks";

export const getOrdersQueryFn = async (
  shopId: string,
  filters?: TObject
): Promise<IPaginatedResponse<IOrderResponse>> =>
  api.get(`/orders/all/${shopId}`, { params: filters }).then((res) => res.data);

export const getOrderQueryFn = async (
  shopId: string,
  orderId: string
): Promise<IResponse<IOrderResponse>> =>
  api.get(`/orders/${shopId}/${orderId}`).then((res) => res.data);
