import { IPlan } from "@/modules/dashboard/plans/utils/plan.interface";
import { api } from "../axios";
import { IResponse } from "../utils/axios.interface";

export const getPlansQueryFn = async (): Promise<IResponse<IPlan[]>> =>
  await api.get("/plans").then((res) => res.data);

export const getPlanQueryFn = async (id: string): Promise<IResponse<IPlan>> =>
  await api.get(`/plans/${id}`).then((res) => res.data);
