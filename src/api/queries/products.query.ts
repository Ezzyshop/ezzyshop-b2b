import { IProduct } from "@/features/dashboard/products/utils/product.interface";
import { api } from "../axios";
import { IPaginatedResponse, IResponse } from "../utils/axios.interface";

export const getProductsQueryFn = (
  shopId: string
): Promise<IPaginatedResponse<IProduct>> =>
  api.get(`/products/${shopId}`).then((res) => res.data);

export const getProductQueryFn = (
  shopId: string,
  productId: string
): Promise<IResponse<IProduct>> =>
  api.get(`/products/${shopId}/${productId}`).then((res) => res.data);
