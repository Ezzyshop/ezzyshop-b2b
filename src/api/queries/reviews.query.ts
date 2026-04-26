import { api } from '../axios';
import { IReview } from '@/features/dashboard/reviews/utils/review.interface';

interface IReviewsResponse {
  data: IReview[];
  message: string;
  paginationInfo: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  };
}

export const getShopReviewsQueryFn = (shopId: string, params?: Record<string, unknown>): Promise<IReviewsResponse> =>
  api.get(`/reviews/shop/${shopId}`, { params }).then((res) => res.data);
