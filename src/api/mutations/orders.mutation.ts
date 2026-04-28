import { OrderStatus } from "@/features/dashboard/orders/utils/order.enum";
import { api } from "../axios";

export const updateOrderStatusMutationFn = (
  shopId: string,
  orderId: string,
  status: OrderStatus,
  comment?: string,
) => api.put(`/orders/${shopId}/${orderId}/status`, { status, comment });

export const acceptOrderMutationFn = (shopId: string, orderId: string) =>
  api.put(`/orders/${shopId}/${orderId}/accept`);
