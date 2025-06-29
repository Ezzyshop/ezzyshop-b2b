import { getPlanQueryFn } from "@/api/queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { IPlanForm } from "../utils/plan.interface";
import { LayoutLoader } from "@/components/loaders/global-loader";
import { updatePlanMutationFn } from "@/api/mutations";
import { PlanForm } from "../components/plan-form/plan-form";
import { toast } from "sonner";
import { useMemo } from "react";

export const PlanEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["plan", id],
    queryFn: () => getPlanQueryFn(id!),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: IPlanForm) => updatePlanMutationFn(id!, data),
    onSuccess: () => {
      toast.success("Tarif muvaffaqiyatli yanginaldi");
      navigate("/moderator/plans");
    },
  });

  const handleSubmit = (data: IPlanForm) => {
    mutate(data);
  };

  const initialValues: IPlanForm = useMemo(() => {
    if (!data?.data) return {} as IPlanForm;

    return {
      name: data.data.name,
      description: data.data.description,
      price: data.data.price,
      products: data.data.products,
      categories: data.data.categories,
      orders: data.data.orders,
      status: data.data.status,
    };
  }, [data]);

  if (isLoading) {
    return <LayoutLoader />;
  }

  return (
    <PlanForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      initialValues={initialValues}
    />
  );
};

export default PlanEditPage;
