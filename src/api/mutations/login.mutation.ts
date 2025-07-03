import { api } from "../axios";
import type { ILoginForm } from "@/features/auth/login/utils";

export const loginMutationFn = (data: ILoginForm) =>
  api.post("/auth/login", data);

export const logoutMutationFn = () => api.post("/auth/logout");
