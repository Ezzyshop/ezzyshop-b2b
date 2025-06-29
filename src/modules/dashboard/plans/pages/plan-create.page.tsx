import { useMutation } from "@tanstack/react-query";
import { IPlan } from "../utils/plan.interface";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createPlanMutationFn } from "@/api/mutations";
import { PlanForm } from "../components/plan-form/plan-form";

export const PlanCreatePage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: IPlan) => createPlanMutationFn(data),
    onSuccess: () => {
      toast.success("Tarif muvaffaqiyatli yaratildi");
      navigate("/dashboard/plans");
    },
  });

  const handleSubmit = (data: IPlan) => {
    mutate(data);
  };

  return <PlanForm onSubmit={handleSubmit} isLoading={isPending} />;
};

export default PlanCreatePage;
