import { api } from "../axios";
import { IShop } from "@/modules/dashboard/shops/utils";
import { IPaginatedResponse } from "../utils/axios.interface";

export const getAllShopsQueryFn = (
  filter?: Record<keyof IShop, string>
): Promise<IPaginatedResponse<IShop>> =>
  api.get("/shops", { params: filter }).then((res) => res.data);
