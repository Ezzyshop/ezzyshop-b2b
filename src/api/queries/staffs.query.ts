import { TObject } from "@/hooks/use-query-params";
import { api } from "../axios";
import { IPaginatedResponse } from "../utils/axios.interface";
import { IUser } from "@/lib";

export const getStaffsQueryFn = (
  shopId: string,
  filter: TObject
): Promise<IPaginatedResponse<IUser>> =>
  api.get(`/staffs/${shopId}`, { params: filter }).then((res) => res.data);
