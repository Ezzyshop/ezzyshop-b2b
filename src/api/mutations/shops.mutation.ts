import {
  IShop,
  IShopForm,
  IShopUpdateForm,
} from "@/features/moderator/shops/utils";
import { api } from "../axios";

export const createShopMutationFn = (data: IShopForm) => {
  return api.post("/shops", data);
};

export const updateShopMutationFn = (
  id: string,
  data: IShopForm
): Promise<IShop> => api.put(`/shops/${id}`, data).then((res) => res.data);

export const updateShopTelegramMutationFn = (
  id: string,
  data: IShopUpdateForm["telegram"]
): Promise<IShop> =>
  api.put(`/shops/${id}/telegram`, data).then((res) => res.data);

export const updateShopPlanMutationFn = (
  id: string,
  data: { plan: IShopForm["plan"] }
): Promise<IShop> => api.put(`/shops/${id}/plan`, data).then((res) => res.data);
