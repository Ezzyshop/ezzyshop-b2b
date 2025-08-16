import { OrderStatus } from "@/features/dashboard/orders/utils/order.enum";
import { api } from "../axios";

export const updateOrderStatusMutationFn = (
  shopId: string,
  orderId: string,
  status: OrderStatus
) => api.put(`/orders/${shopId}/${orderId}/status`, { status });
