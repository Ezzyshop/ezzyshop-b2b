import { ProductStatus } from "./product.enum";

export interface IProductForm {
  name: {
    uz: string;
    en?: string;
    ru?: string;
  };
  description?: {
    uz?: string;
    en?: string;
    ru?: string;
  };
  price: number;
  compare_at_price?: number | null;
  images?: string[];
  categories?: string[];
  variants?: {
    sku: string;
    attributes: Record<string, string>;
    price: number;
    quantity: number;
    image?: string;
  }[];
  status: ProductStatus;
  delivery_time?: number;
}

export interface IProduct {
  _id: string;
  name: {
    uz: string;
    en?: string;
    ru?: string;
  };
  description?: {
    uz?: string;
    en?: string;
    ru?: string;
  };
  price: number;
  compare_at_price?: number | null;
  images?: string[];
  categories?: string[];
  variants?: {
    sku: string;
    attributes: Record<string, string>;
    price: number;
    quantity: number;
    image?: string;
  }[];
  status: ProductStatus;
  shop: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  delivery_time?: number;
}
