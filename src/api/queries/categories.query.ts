import { ICategory } from "@/features/dashboard/categories/components/utils/category.interface";
import { api } from "../axios";
import { IPaginatedResponse } from "../utils/axios.interface";
import { TObject } from "@/hooks";

export const getCategoriesQueryFn = async (
  shopId: string,
  filters?: TObject
): Promise<IPaginatedResponse<ICategory>> => {
  const response = await api.get(`/categories/${shopId}`, { params: filters });
  return response.data;
};
