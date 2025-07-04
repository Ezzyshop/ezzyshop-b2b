export interface IProductForm {
  name: {
    uz: string;
    en?: string;
    ru?: string;
  };
  description?: string;
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
  isActive: boolean;
}
