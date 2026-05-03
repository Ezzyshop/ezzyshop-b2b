import { api } from "../axios";

export interface IAiImage {
  _id: string;
  shopId: string;
  type: "product" | "category";
  prompt: string;
  url: string;
  filename: string;
  format: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAiImagesResponse {
  data: IAiImage[];
  paginationInfo: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const getAiImagesQueryFn = (
  shopId: string,
  params?: { page?: number; limit?: number; type?: "product" | "category" },
): Promise<IAiImagesResponse> =>
  api
    .get(`/shops/${shopId}/upload/ai-images`, { params })
    .then((res) => res.data);
