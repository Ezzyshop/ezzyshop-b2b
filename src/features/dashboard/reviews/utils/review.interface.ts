export interface IReview {
  _id: string;
  user: {
    _id: string;
    full_name: string;
    phone?: string;
  };
  product: {
    _id: string;
    name: { uz: string; ru?: string; en?: string };
    main_image: string;
  };
  shop: string;
  order: string;
  rating: number;
  message?: string;
  images: string[];
  reply?: string;
  reply_at?: string;
  createdAt: string;
  updatedAt: string;
}
