import { CouponDiscountType, CouponStatus } from './coupon.enum';

export interface ICoupon {
  _id: string;
  code: string;
  discount_type: CouponDiscountType;
  discount_value: number;
  min_order_price: number;
  max_uses: number | null;
  max_uses_per_user: number | null;
  used_count: number;
  expires_at: string | null;
  status: CouponStatus;
  allowed_users: string[];
  createdAt: string;
}

export interface IShopCustomer {
  _id: string;
  full_name: string;
  phone: string;
}

export interface ICouponUsage {
  _id: string;
  coupon: string;
  discount_amount: number;
  createdAt: string;
  user: {
    _id: string;
    full_name: string;
    phone: string;
  };
  order: {
    _id: string;
    total_price: number;
    createdAt: string;
  };
}

export interface ICreateCouponForm {
  code: string;
  discount_type: CouponDiscountType;
  discount_value: number;
  min_order_price?: number;
  max_uses?: number | null;
  max_uses_per_user?: number | null;
  expires_at?: string | null;
  allowed_users?: string[];
}
