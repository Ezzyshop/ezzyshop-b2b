import { createShopMutationFn } from "@/api/mutations";
import { useMutation } from "@tanstack/react-query";
import { IShopForm } from "../utils";
import { ShopForm } from "../components/shop-form/shop-form";

export const ShopCreatePage = () => {
  const shopCreateMutation = useMutation({
    mutationFn: (data: IShopForm) => createShopMutationFn(data),
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
