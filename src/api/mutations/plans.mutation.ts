import { IPlanForm } from "@/modules/dashboard/plans/utils/plan.interface";
import { api } from "../axios";

export const createPlanMutationFn = async (data: IPlanForm) =>
  await api.post("/plans", data).then((res) => res.data);

export const updatePlanMutationFn = async (id: string, data: IPlanForm) =>
  await api.put(`/plans/${id}`, data).then((res) => res.data);
