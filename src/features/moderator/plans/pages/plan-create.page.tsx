import { useMutation } from "@tanstack/react-query";
import { IPlanForm } from "../utils/plan.interface";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createPlanMutationFn } from "@/api/mutations";
import { PlanForm } from "../components/plan-form/plan-form";

export const PlanCreatePage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: IPlanForm) => createPlanMutationFn(data),
    onSuccess: () => {
      toast.success("Tarif muvaffaqiyatli yaratildi");
      navigate("/moderator/plans");
    },
  });

  const handleSubmit = (data: IPlanForm) => {
    mutate(data);
  };

  return <PlanForm onSubmit={handleSubmit} isLoading={isPending} />;
};

export default PlanCreatePage;
