import { api } from "@/api/axios";
import { IDeliveryZone } from "@/features/dashboard/delivery-zone/utils/delivery-zone.interface";

export const getDeliveryZonesQueryFn = async (shopId: string): Promise<{ data: IDeliveryZone[] }> =>
  api.get(`/delivery-zones/${shopId}`).then((res) => res.data);
