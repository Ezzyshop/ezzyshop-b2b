import { api } from "../axios";
import { IStaffForm } from "@/features/dashboard/staffs/utils/staff.interface";

export const deleteStaffMutationFn = (shopId: string, staffId: string) =>
  api.delete(`/staffs/${shopId}/${staffId}`);

export const createStaffMutationFn = (shopId: string, staff: IStaffForm) =>
  api.post(`/staffs/${shopId}`, staff);

export const updateStaffMutationFn = (
  shopId: string,
  staffId: string,
  staff: IStaffForm
) => api.put(`/staffs/${shopId}/${staffId}`, staff);
