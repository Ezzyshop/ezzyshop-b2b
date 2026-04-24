import { api } from "@/api/axios";
import { IDeliveryZoneForm } from "@/features/dashboard/delivery-zone/utils/delivery-zone.interface";

export const createDeliveryZoneMutationFn = async (shopId: string, data: IDeliveryZoneForm) =>
  api.post(`/delivery-zones/${shopId}`, data).then((res) => res.data);

export const updateDeliveryZoneMutationFn = async (shopId: string, id: string, data: Partial<IDeliveryZoneForm> & { status?: string }) =>
  api.put(`/delivery-zones/${shopId}/${id}`, data).then((res) => res.data);

export const deleteDeliveryZoneMutationFn = async (shopId: string, id: string) =>
  api.delete(`/delivery-zones/${shopId}/${id}`).then((res) => res.data);
