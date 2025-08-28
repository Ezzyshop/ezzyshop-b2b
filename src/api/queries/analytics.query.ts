import {
  ITotalTransactionAnalytics,
  ITotalAnalytics,
  ITotalSalesAnalytics,
} from "@/lib";
import { api } from "../axios";
import { IResponse } from "../utils/axios.interface";

export const getOrdersAnalyticsQueryFn = (shopId: string) =>
  api.get(`/analytics/${shopId}/orders`).then((res) => res.data);

export const getTotalAnalyticsQueryFn = (
  shopId: string
): Promise<ITotalAnalytics> =>
  api.get(`/analytics/${shopId}/totals`).then((res) => res.data.data);

export const getTotalTransactionsQueryFn = (
  shopId: string,
  startDate: string,
  endDate: string
): Promise<IResponse<ITotalTransactionAnalytics>> =>
  api
    .get(`/analytics/${shopId}/transactions`, {
      params: {
        startDate,
        endDate,
      },
    })
    .then((res) => res.data);

export const getSalesChartQueryFn = (
  shopId: string,
  startDate: string,
  endDate: string
): Promise<IResponse<ITotalSalesAnalytics>> =>
  api
    .get(`/analytics/${shopId}/sales`, {
      params: {
        startDate,
        endDate,
      },
    })
    .then((res) => res.data);
