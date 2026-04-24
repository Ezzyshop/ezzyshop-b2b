import {
  IProduct,
  IProductForm,
} from "@/features/dashboard/products/utils/product.interface";
import { api } from "../axios";

export const createProductMutationFn = (
  data: IProductForm,
  shopId: string
): Promise<IProduct> =>
  api.post(`/products/${shopId}`, data).then((res) => res.data);

export const editProductMutationFn = (
  data: IProductForm,
  shopId: string,
  productId: string
): Promise<IProduct> =>
  api.put(`/products/${shopId}/${productId}`, data).then((res) => res.data);

export const deleteProductMutationFn = (
  shopId: string,
  productId: string
): Promise<void> =>
  api.delete(`/products/${shopId}/${productId}`).then((res) => res.data);

export const reorderProductsMutationFn = (
  shopId: string,
  items: { id: string; order: number }[]
): Promise<void> =>
  api.put(`/products/${shopId}/reorder`, { items }).then((res) => res.data);
