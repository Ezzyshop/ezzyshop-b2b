import { IProduct } from "@/features/dashboard/products/utils/product.interface";
import { api } from "../axios";
import { IPaginatedResponse, IResponse } from "../utils/axios.interface";
import { TObject } from "@/hooks";

export const getProductsQueryFn = (
  shopId: string,
  filters: TObject
): Promise<IPaginatedResponse<IProduct>> =>
  api.get(`/products/${shopId}`, { params: filters }).then((res) => res.data);

export const getProductQueryFn = (
  shopId: string,
  productId: string
): Promise<IResponse<IProduct>> =>
  api.get(`/products/${shopId}/${productId}`).then((res) => res.data);
