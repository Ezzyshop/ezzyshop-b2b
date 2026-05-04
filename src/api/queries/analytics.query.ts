import {
  ITotalTransactionAnalytics,
  ITotalAnalytics,
  ITotalSalesAnalytics,
} from "@/lib";
import {
  ISearchAnalytics,
  IProductViewsAnalytics,
  IProductSalesAnalytics,
  ITopCustomersAnalytics,
  IOrdersDetailedAnalytics,
  IConversionFunnelAnalytics,
} from "@/features/dashboard/metrics/utils/metrics.interface";
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
      params: { startDate, endDate },
    })
    .then((res) => res.data);

export const getSearchAnalyticsQueryFn = (
  shopId: string,
  params: { startDate: string; endDate: string; groupBy?: string; page?: number; limit?: number }
): Promise<{ data: ISearchAnalytics }> =>
  api.get(`/analytics/${shopId}/search-keywords`, { params }).then((res) => res.data);

export const getProductViewsAnalyticsQueryFn = (
  shopId: string,
  params: { startDate: string; endDate: string; groupBy?: string; page?: number; limit?: number }
): Promise<{ data: IProductViewsAnalytics }> =>
  api.get(`/analytics/${shopId}/product-views`, { params }).then((res) => res.data);

export const getProductSalesAnalyticsQueryFn = (
  shopId: string,
  params: { startDate: string; endDate: string; groupBy?: string; page?: number; limit?: number }
): Promise<{ data: IProductSalesAnalytics }> =>
  api.get(`/analytics/${shopId}/product-sales`, { params }).then((res) => res.data);

export const getTopCustomersAnalyticsQueryFn = (
  shopId: string,
  params: { startDate: string; endDate: string; page?: number; limit?: number }
): Promise<{ data: ITopCustomersAnalytics }> =>
  api.get(`/analytics/${shopId}/top-customers`, { params }).then((res) => res.data);

export const getOrdersDetailedAnalyticsQueryFn = (
  shopId: string,
  params: { startDate: string; endDate: string; groupBy?: string }
): Promise<{ data: IOrdersDetailedAnalytics }> =>
  api.get(`/analytics/${shopId}/orders-detailed`, { params }).then((res) => res.data);

export const getConversionFunnelQueryFn = (
  shopId: string,
  params: { startDate: string; endDate: string }
): Promise<{ data: IConversionFunnelAnalytics }> =>
  api.get(`/analytics/${shopId}/cart-funnel`, { params }).then((res) => res.data);

export interface IShopLinkClickItem {
  shop_id: string;
  shop_name: string;
  owner_name: string;
  total_clicks: number;
}

export interface ILinkClicksOverview {
  total_clicks: number;
  shops: IShopLinkClickItem[];
}

export const getLinkClicksOverviewQueryFn = (): Promise<{ data: ILinkClicksOverview }> =>
  api.get('/analytics/link-clicks/overview').then((res) => res.data);
