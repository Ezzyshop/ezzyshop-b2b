import { IPlanForm } from "@/features/moderator/plans/utils/plan.interface";
import { api } from "../axios";
import { PlanStatus } from "@/features/moderator/plans/utils/plan.enum";

export const createPlanMutationFn = async (data: IPlanForm) =>
  await api.post("/plans", data).then((res) => res.data);

export const updatePlanMutationFn = async (id: string, data: IPlanForm) =>
  await api.put(`/plans/${id}`, data).then((res) => res.data);

export const changePlanStatusMutationFn = async (
  id: string,
  data: { status: PlanStatus }
) => await api.patch(`/plans/${id}`, data).then((res) => res.data);
