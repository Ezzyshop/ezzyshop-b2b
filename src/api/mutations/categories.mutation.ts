import { ICategoryForm } from "@/features/dashboard/categories/components/utils/category.interface";
import { api } from "../axios";

export const createCategoryMutationFn = async (
  data: ICategoryForm,
  shopId: string
) => {
  const response = await api.post(`/categories/${shopId}`, data);
  return response.data;
};
