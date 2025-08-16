import { api } from "../axios";

export const getOrdersAnalyticsQueryFn = (shopId: string) =>
  api.get(`/analytics/${shopId}/orders`).then((res) => res.data);
