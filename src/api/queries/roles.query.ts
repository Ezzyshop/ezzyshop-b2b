import { api } from "../axios";
import { IRole, IMyRole } from "@/lib/types/permission.types";

export const getRolesQueryFn = (shopId: string): Promise<{ data: IRole[] }> =>
  api.get(`/roles/${shopId}`).then((res) => res.data);

export const getMyRoleQueryFn = (shopId: string): Promise<{ data: IMyRole }> =>
  api.get(`/roles/my-role/${shopId}`).then((res) => res.data);
