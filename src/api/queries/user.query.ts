import { IUser } from "@/lib/interfaces/user.interface";
import { api } from "../axios";
import { IPaginatedResponse } from "../utils/axios.interface";
import { TObject } from "@/hooks";

export const getCurrentUser = () => api.get("/users/me/info");

export const getUsers = (filter: TObject): Promise<IPaginatedResponse<IUser>> =>
  api.get("/users/all", { params: filter }).then((res) => res.data);
