import { api } from "../axios";
import { IShop, IShopTelegramForm } from "@/features/moderator/shops/utils";
import { IPaginatedResponse, IResponse } from "../utils/axios.interface";
import { TObject } from "@/hooks";

export const getAllShopsQueryFn = (
  filter?: TObject
): Promise<IPaginatedResponse<IShop>> =>
  api.get("/shops", { params: filter }).then((res) => res.data);

export const getShopQueryFn = (id: string): Promise<IResponse<IShop>> =>
  api.get(`/shops/${id}`).then((res) => res.data);

export const getByShopByIdQueryFn = (id: string): Promise<IResponse<IShop>> =>
  api.get(`/shops/me/${id}`).then((res) => res.data);

export const getShopTelegramQueryFn = (
  id: string
): Promise<IResponse<IShopTelegramForm>> =>
  api.get(`/shops/${id}/get-bot`).then((res) => res.data);
