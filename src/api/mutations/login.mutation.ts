import { api } from "../axios";
import type { ILoginForm } from "@/modules/auth/login/utils";

export const loginMutation = (data: ILoginForm) =>
  api.post("/auth/login", data);
