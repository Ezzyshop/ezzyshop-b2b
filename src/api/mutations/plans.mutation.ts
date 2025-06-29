import { IPlan } from "@/modules/dashboard/plans/utils/plan.interface";
import { api } from "../axios";

export const createPlanMutationFn = async (data: IPlan) =>
  await api.post("/plans", data).then((res) => res.data);
