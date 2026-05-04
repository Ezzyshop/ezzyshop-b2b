import { IShop, IShopForm } from "@/features/moderator/shops/utils";
import { api } from "../axios";

export const createShopMutationFn = (data: IShopForm) => {
  return api.post("/shops", data);
};

export const updateShopMutationFn = (
  id: string,
  data: IShopForm
): Promise<IShop> => api.put(`/shops/${id}`, data).then((res) => res.data);

export const updateShopPlanMutationFn = (
  id: string,
  data: { plan: string }
): Promise<IShop> => api.put(`/shops/${id}/plan`, data).then((res) => res.data);

export const deleteShopMutationFn = (id: string) => {
  return api.delete(`/shops/${id}`);
};
