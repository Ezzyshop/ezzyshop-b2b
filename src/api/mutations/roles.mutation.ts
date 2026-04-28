import { api } from "../axios";
import { IRoleForm } from "@/lib/types/permission.types";

export const createRoleMutationFn = (shopId: string, data: IRoleForm) =>
  api.post(`/roles/${shopId}`, data);

export const updateRoleMutationFn = (shopId: string, roleId: string, data: IRoleForm) =>
  api.put(`/roles/${shopId}/${roleId}`, data);

export const deleteRoleMutationFn = (shopId: string, roleId: string) =>
  api.delete(`/roles/${shopId}/${roleId}`);
