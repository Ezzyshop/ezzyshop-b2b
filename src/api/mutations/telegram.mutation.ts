import { TTelegramForm } from "@/features/dashboard/telegram/utils/telegram.interface";
import { api } from "../axios";

export const createTelegramMutationFn = async (
  shopId: string,
  body: TTelegramForm
) => api.post(`/telegram/${shopId}`, body);

export const updateTelegramMutationFn = async (
  shopId: string,
  telegramId: string,
  body: TTelegramForm
) => api.put(`/telegram/${shopId}/${telegramId}`, body);

export const deleteTelegramMutationFn = async (
  shopId: string,
  telegramId: string
) => api.delete(`/telegram/${shopId}/${telegramId}`);
