import { api } from "../axios";
import { ITelegramCheckTokenResponse } from "@/lib/interfaces";

export const checkTelegramTokenQueryFn = (
  token: string
): Promise<ITelegramCheckTokenResponse> =>
  api.get(`/telegram/check-token/${token}`).then((res) => res.data);
