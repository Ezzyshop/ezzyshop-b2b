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
  main_image: string;
  video?: string;
  categories?: string[];
  variants?: {
    sku: string;
    attributes: Record<string, string>;
    price: number;
    quantity: number;
    compare_at_price?: number;
    images: string[];
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
  main_image: string;
  video?: string;
  categories?: string[];
  variants?: {
    sku: string;
    attributes: Record<string, string>;
    price: number;
    quantity: number;
    images: string[];
  }[];
  status: ProductStatus;
  shop: {
    _id: string;
    name: string;
  };
  order: number;
  createdAt: string;
  updatedAt: string;
  delivery_time?: number;
  avg_rating?: number;
  review_count?: number;
}
