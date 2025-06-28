import { IShopForm } from "@/modules/dashboard/shops/utils";
import { api } from "../axios";

export const createShopMutationFn = (data: IShopForm) => {
  return api.post("/shops", data);
};
