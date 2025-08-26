import { ITelegram } from "@/features/dashboard/telegram/utils/telegram.interface";
import { api } from "../axios";
import { ITelegramCheckTokenResponse } from "@/lib/interfaces";

export const checkTelegramTokenQueryFn = (
  token: string
): Promise<ITelegramCheckTokenResponse> =>
  api.get(`/telegram/check-token/${token}`).then((res) => res.data);

export const getTelegramByIdQueryFn = (shopId: string): Promise<ITelegram> =>
  api.get(`/telegram/${shopId}`).then((res) => res.data);
