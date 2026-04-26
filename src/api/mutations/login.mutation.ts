import { api } from "../axios";
import type { ILoginForm } from "@/features/auth/login/utils";

export const loginMutationFn = (data: ILoginForm) =>
  api.post("/auth/login", data);

export const logoutMutationFn = () => api.post("/auth/logout");

export const verifyOtpMutationFn = (data: ILoginForm) =>
  api.post("/auth/verify-otp", data);

export const telegramOidcMutationFn = (data: {
  code: string;
  redirect_uri: string;
}) => api.post("/auth/telegram-oidc", data);
