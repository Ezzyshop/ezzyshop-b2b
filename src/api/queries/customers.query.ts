import { api } from "../axios";
import { IPaginatedResponse } from "../utils/axios.interface";
import { TObject } from "@/hooks";
import { ICustomerResponse } from "@/features/dashboard/customers/utils/customer.interface";

export const getCustomersQueryFn = async (
  shopId: string,
  filters?: TObject
): Promise<IPaginatedResponse<ICustomerResponse>> =>
  api.get(`/customers/all/${shopId}`, { params: filters }).then((res) => res.data);
