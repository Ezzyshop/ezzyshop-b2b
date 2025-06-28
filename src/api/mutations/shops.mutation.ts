import { IShop, IShopForm } from "@/modules/dashboard/shops/utils";
import { api } from "../axios";

export const createShopMutationFn = (data: IShopForm) => {
  return api.post("/shops", data);
};

export const updateShopMutationFn = (
  id: string,
  data: IShopForm
): Promise<IShop> => api.put(`/shops/${id}`, data).then((res) => res.data);
