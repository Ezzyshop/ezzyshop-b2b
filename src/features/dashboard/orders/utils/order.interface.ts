import {
  TransactionChequeImageStatus,
  TransactionStatus,
} from "./transaction.enum";
import { OrderStatus } from "./order.enum";
import { ICurrency } from "@/features/moderator/currencies/utils/currency.interface";
import { IPaymentMethod } from "../../payment-methods/utils/payment-methods.interface";

export interface IOrderCreateRequest {
  product: {
    product: string;
    variant: string | null;
    quantity: number;
  }[];
  payment_method: string;
  delivery_method?: string;
  delivery_address?: {
    address: string;
    lat: number;
    lng: number;
  };
  pickup_address?: string;
  customer_info: {
    name: string;
    phone: string;
  };
  notes?: string;
}

export interface IOrderStatusHistory {
  from_status: OrderStatus;
  to_status: OrderStatus;
  changed_by: {
    _id: string;
    full_name: string;
    email: string;
  };
  changed_at: string;
  comment?: string;
}

export interface IOrderResponse {
  _id: string;
  status: OrderStatus;
  status_history?: IOrderStatusHistory[];
  createdAt: string;
  customer_info: {
    name: string;
    phone: string;
  };
  total_quantity: number;
  total_price: number;
  total_discount: number;
  coupon_discount?: number;
  coupon_code?: string;
  delivery_method?: {
    _id: string;
    price: number;
  };
  delivery_address?: {
    address: string;
    lat: number;
    lng: number;
    _id: string;
  };
  pickup_address?: {
    address: string;
    lat: number;
    lng: number;
    _id: string;
  };
  products: IOrderProduct[];
  transaction: {
    _id: string;
    status: TransactionStatus;
    cheque_images: {
      url: string;
      status: TransactionChequeImageStatus;
      reason?: string;
      createdAt: string;
      updatedAt: string;
      _id: string;
      status_history?: {
        from_status: TransactionChequeImageStatus;
        to_status: TransactionChequeImageStatus;
        changed_by: { _id: string; full_name: string; email: string };
        changed_at: string;
        reason?: string;
      }[];
    }[];
    currency: ICurrency;
    provider: IPaymentMethod;
  };
  notes?: string;
}

export interface IOrderProduct {
  _id: string;
  price: number;
  compare_at_price?: number;
  product: {
    _id: string;
    name: {
      uz: string;
      ru: string;
      en: string;
    };
    main_image: string;
  };
  quantity: number;
  total_price: number;
  variant?: {
    images: string[];
    attributes: Record<string, string>;
    name: {
      uz: string;
      ru: string;
      en: string;
    };
    _id: string;
  };
}

export interface IOrderParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
}
