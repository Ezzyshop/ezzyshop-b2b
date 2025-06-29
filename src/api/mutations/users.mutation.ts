import { IUserForm } from "@/lib/interfaces";
import { api } from "../axios";

export const createUserMutationFn = (data: IUserForm) =>
  api.post("/users", data);
