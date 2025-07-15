import {
  IShop,
  IShopForm,
  IShopTelegramForm,
} from "@/features/moderator/shops/utils";
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
  data: { plan: IShopForm["plan"] }
): Promise<IShop> => api.put(`/shops/${id}/plan`, data).then((res) => res.data);

// Assign Telegram

export const assignTelegramBotMutationFn = (
  shopId: string,
  data: IShopTelegramForm
) => api.put(`/shops/${shopId}/assign-bot`, data).then((res) => res.data);

export const updateTelegramBotMutationFn = (
  shopId: string,
  data: IShopTelegramForm
) => api.put(`/shops/${shopId}/update-bot`, data).then((res) => res.data);
