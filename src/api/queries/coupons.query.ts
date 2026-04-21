import { api } from '../axios';
import { IResponse } from '../utils/axios.interface';
import { ICoupon, ICouponUsage, IShopCustomer } from '@/features/dashboard/coupons/utils/coupon.interface';

export const getCouponsQueryFn = (shopId: string): Promise<IResponse<ICoupon[]>> =>
  api.get(`/coupons/${shopId}`).then((res) => res.data);

export const getCouponUsagesQueryFn = (shopId: string, couponId: string): Promise<IResponse<ICouponUsage[]>> =>
  api.get(`/coupons/${shopId}/${couponId}/usages`).then((res) => res.data);

export const getShopCustomersQueryFn = (shopId: string): Promise<IResponse<IShopCustomer[]>> =>
  api.get(`/coupons/${shopId}/customers`).then((res) => res.data);
