import { IDeliveryMethodForm } from "@/features/dashboard/delivery-methods/utils/delivery-methods.interface";
import { api } from "../axios";
import { DeliveryMethodStatus } from "@/features/dashboard/delivery-methods/utils/devliery-methods.enum";

export const createDeliveryMethodMutationFn = async (
  shopId: string,
  data: IDeliveryMethodForm
) => api.post(`/delivery-methods/${shopId}`, data).then((res) => res.data);

export const updateDeliveryMethodMutationFn = async (
  shopId: string,
  id: string,
  data: IDeliveryMethodForm
) => api.put(`/delivery-methods/${shopId}/${id}`, data).then((res) => res.data);

export const deleteDeliveryMethodMutationFn = async (
  shopId: string,
  id: string
) => api.delete(`/delivery-methods/${shopId}/${id}`).then((res) => res.data);

export const changeDeliveryMethodStatusMutationFn = async (
  shopId: string,
  id: string,
  status: DeliveryMethodStatus
) =>
  api
    .put(`/delivery-methods/${shopId}/${id}/status`, { status })
    .then((res) => res.data);
