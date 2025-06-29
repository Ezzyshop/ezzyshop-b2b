import { IPlan } from "@/modules/dashboard/plans/utils/plan.interface";
import { api } from "../axios";
import { IResponse } from "../utils/axios.interface";

export const getPlansQueryFn = async (): Promise<IResponse<IPlan[]>> =>
  await api.get("/plans").then((res) => res.data);
