import { ITelegram } from "@/features/dashboard/telegram/utils/telegram.interface";
import { api } from "../axios";

export const getTelegramQueryFn = (shopId: string): Promise<ITelegram> =>
  api.get(`/telegram/${shopId}`).then((res) => res.data);
