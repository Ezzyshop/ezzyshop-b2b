import { api } from '../axios';
import { ICreateCouponForm } from '@/features/dashboard/coupons/utils/coupon.interface';

export const createCouponMutationFn = (shopId: string, data: ICreateCouponForm) =>
  api.post(`/coupons/${shopId}`, data).then((res) => res.data);

export const updateCouponMutationFn = (shopId: string, couponId: string, data: Partial<ICreateCouponForm>) =>
  api.put(`/coupons/${shopId}/${couponId}`, data).then((res) => res.data);

export const deleteCouponMutationFn = (shopId: string, couponId: string) =>
  api.delete(`/coupons/${shopId}/${couponId}`).then((res) => res.data);
