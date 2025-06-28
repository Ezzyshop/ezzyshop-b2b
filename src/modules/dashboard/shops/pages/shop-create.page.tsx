import { createShopMutationFn } from "@/api/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IShopForm } from "../utils";
import { ShopForm } from "../components/shop-form/shop-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const ShopCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const shopCreateMutation = useMutation({
    mutationFn: (data: IShopForm) => createShopMutationFn(data),
    onSuccess: () => {
      toast.success("Biznes yaratildi");
      navigate("/dashboard/shops");
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
  });

  const handleSubmit = (data: IShopForm) => {
    shopCreateMutation.mutate(data);
  };

  return (
    <ShopForm
      onSubmit={handleSubmit}
      isLoading={shopCreateMutation.isPending}
    />
  );
};

export default ShopCreatePage;
