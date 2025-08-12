import { IBranch } from "@/features/dashboard/branches/utils/branches.interface";
import { api } from "../axios";
import { IPaginatedResponse } from "../utils/axios.interface";
import { TObject } from "@/hooks";

export const getBranchesQueryFn = async (
  shopId: string,
  filters?: TObject
): Promise<IPaginatedResponse<IBranch>> =>
  api.get(`/branches/${shopId}`, { params: filters }).then((res) => res.data);

export const getBranchQueryFn = async (
  id: string,
  shopId: string
): Promise<IBranch> =>
  api.get(`/branches/${shopId}/${id}`).then((res) => res.data);
