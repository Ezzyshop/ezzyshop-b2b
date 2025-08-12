import { BranchStatus } from "@/features/dashboard/branches/utils/branches.enum";
import { api } from "../axios";
import { IBranchForm } from "@/features/dashboard/branches/utils/branches.interface";

export const createBranchMutationFn = async (
  shopId: string,
  data: IBranchForm
) => api.post(`/branches/${shopId}`, data).then((res) => res.data);

export const updateBranchMutationFn = async (
  shopId: string,
  id: string,
  data: IBranchForm
) => api.put(`/branches/${shopId}/${id}`, data).then((res) => res.data);

export const deleteBranchMutationFn = async (
  shopId: string,
  id: string
) => api.delete(`/branches/${shopId}/${id}`).then((res) => res.data);

export const changeBranchStatusMutationFn = async (
  shopId: string,
  id: string,
  status: BranchStatus
) =>
  api
    .put(`/branches/${shopId}/${id}/status`, { status })
    .then((res) => res.data);
