import { ITotalAnalytics } from "@/lib";
import { api } from "../axios";

export const getOrdersAnalyticsQueryFn = (shopId: string) =>
  api.get(`/analytics/${shopId}/orders`).then((res) => res.data);

export const getTotalAnalyticsQueryFn = (
  shopId: string
): Promise<ITotalAnalytics> =>
  api.get(`/analytics/${shopId}/totals`).then((res) => res.data.data);
