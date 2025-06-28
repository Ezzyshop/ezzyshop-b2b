import { getPlans, getShopQueryFn } from "@/api/queries";
import { LayoutLoader } from "@/components/loaders/global-loader";
import { useMutation, useQueries } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ShopPlanForm } from "../components/shop-plan-form/shop-plan-form";
import { IShopForm } from "../utils";
import { updateShopPlanMutationFn } from "@/api/mutations";
import { toast } from "sonner";

export const ShopPlanChangePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [shopQuery, plansQuery] = useQueries({
    queries: [
      {
        queryKey: ["shop", id],
        queryFn: () => getShopQueryFn(id!),
      },
      {
        queryKey: ["plans"],
        queryFn: () => getPlans(),
      },
    ],
  });

  const updatePlanMutation = useMutation({
    mutationFn: (data: { plan: IShopForm["plan"] }) =>
      updateShopPlanMutationFn(id!, data),
    onSuccess: () => {
      toast.success("Tarif muvaffaqiyatli o'zgartirildi");
      navigate("/dashboard/shops");
    },
  });

  if (shopQuery.isLoading || plansQuery.isLoading) {
    return <LayoutLoader />;
  }

  const shop = shopQuery.data?.data;
  const plans = plansQuery.data?.data;

  if (!shop) {
    return <Navigate to="/dashboard/shops" />;
  }

  const initialValues: { plan: IShopForm["plan"] } = {
    plan: shop.plan._id,
  };

  const handleSubmit = (data: { plan: IShopForm["plan"] }) => {
    updatePlanMutation.mutate(data);
  };

  return (
    <ShopPlanForm
      initialValue={initialValues}
      onSubmit={handleSubmit}
      plans={plans || []}
      isLoading={updatePlanMutation.isPending}
    />
  );
};

export default ShopPlanChangePage;
