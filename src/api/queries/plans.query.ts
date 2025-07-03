import { IPlan } from "@/features/moderator/plans/utils/plan.interface";
import { api } from "../axios";
import { IPaginatedResponse, IResponse } from "../utils/axios.interface";
import { TObject } from "@/hooks";

export const getPlansQueryFn = async (
  filter?: TObject
): Promise<IPaginatedResponse<IPlan>> =>
  await api.get("/plans", { params: filter }).then((res) => res.data);

export const getPlanQueryFn = async (id: string): Promise<IResponse<IPlan>> =>
  await api.get(`/plans/${id}`).then((res) => res.data);
