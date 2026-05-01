import { api } from "../axios";

export interface ILowStockProduct {
  _id: string;
  name: { uz?: string; ru?: string; en?: string };
  main_image?: string;
  minQty: number;
}

export interface ICouponsSummary {
  active: number;
  expiringSoon: number;
  totalRedemptions: number;
  hasCoupons: boolean;
}

export interface IPendingReview {
  _id: string;
  user: { _id: string; full_name: string };
  product: { _id: string; name: { uz?: string; ru?: string; en?: string }; main_image?: string };
  rating: number;
  message?: string;
  createdAt: string;
}

export interface IPlanUsage {
  planName: string;
  products: { used: number; max: number };
  categories: { used: number; max: number };
  orders: { used: number; max: number };
}

export const getLowStockQueryFn = (shopId: string): Promise<ILowStockProduct[]> =>
  api.get(`/dashboard-stats/${shopId}/low-stock`).then((res) => res.data.data);

export const getCouponsSummaryQueryFn = (shopId: string): Promise<ICouponsSummary> =>
  api.get(`/dashboard-stats/${shopId}/coupons-summary`).then((res) => res.data.data);

export const getPendingReviewsQueryFn = (shopId: string): Promise<IPendingReview[]> =>
  api.get(`/dashboard-stats/${shopId}/pending-reviews`).then((res) => res.data.data);

export const getPlanUsageQueryFn = (shopId: string): Promise<IPlanUsage> =>
  api.get(`/dashboard-stats/${shopId}/plan-usage`).then((res) => res.data.data);
