import { IUserCreateForm, IUserForm } from "@/lib/interfaces";
import { api } from "../axios";

export const createUserMutationFn = (data: IUserCreateForm) =>
  api.post("/users", data);

export const updateUserMutationFn = (id: string, data: IUserForm) =>
  api.put(`/users/${id}`, data);

export const updateUserPasswordMutationFn = (
  id: string,
  data: { password: string; confirm_password: string }
) => api.patch(`/users/${id}/password`, data);

export const deleteUserMutationFn = (id: string) =>
  api.delete(`/users/${id}`);
