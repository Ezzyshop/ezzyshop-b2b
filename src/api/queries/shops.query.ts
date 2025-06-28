import { api } from "../axios";
import { IShop } from "@/modules/dashboard/shops/utils";
import { IPaginatedResponse } from "../utils/axios.interface";
import { TObject } from "@/hooks";

export const getAllShopsQueryFn = (
  filter?: TObject
): Promise<IPaginatedResponse<IShop>> =>
  api.get("/shops", { params: filter }).then((res) => res.data);
