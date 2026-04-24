import { ICategoryForm } from "@/features/dashboard/categories/utils/category.interface";
import { api } from "../axios";

export const createCategoryMutationFn = async (
  data: ICategoryForm,
  shopId: string
) => {
  const response = await api.post(`/categories/${shopId}`, data);
  return response.data;
};

export const updateCategoryMutationFn = async (
  categoryId: string,
  data: ICategoryForm,
  shopId: string
) => {
  const response = await api.put(`/categories/${shopId}/${categoryId}`, data);
  return response.data;
};

export const deleteCategoryMutationFn = async (
  shopId: string,
  categoryId: string
) => {
  const response = await api.delete(`/categories/${shopId}/${categoryId}`);
  return response.data;
};

export const reorderCategoriesMutationFn = async (
  shopId: string,
  items: { id: string; order: number }[]
) => {
  const response = await api.put(`/categories/${shopId}/reorder`, { items });
  return response.data;
};
