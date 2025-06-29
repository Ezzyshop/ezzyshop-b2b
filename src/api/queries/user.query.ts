import { IUser } from "@/lib/interfaces/user.interface";
import { api } from "../axios";
import { IPaginatedResponse } from "../utils/axios.interface";
import { TObject } from "@/hooks";

export const getCurrentUser = () =>
  api.get("/users/me/info").then((res) => res.data);

export const getUsersQueryFn = (
  filter: TObject
): Promise<IPaginatedResponse<IUser>> =>
  api.get("/users/all", { params: filter }).then((res) => res.data);
