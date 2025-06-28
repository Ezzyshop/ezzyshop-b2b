import { getShopQueryFn } from "@/api/queries";
import { LayoutLoader } from "@/components/loaders/global-loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { IShopUpdateForm } from "../utils";
import { updateShopTelegramMutationFn } from "@/api/mutations";
import { toast } from "sonner";
import { ShopTelegramForm } from "../components/shop-telegram-form/shop-telegram-form";

export const ShopTelegramEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["shop", id],
    queryFn: () => getShopQueryFn(id!),
  });

  const updateShopTelegramMutation = useMutation({
    mutationFn: (data: IShopUpdateForm["telegram"]) =>
      updateShopTelegramMutationFn(id!, data),
    onSuccess: () => {
      toast.success("Telegram sozlamalari yangilandi");
      navigate("/dashboard/shops");
    },
  });

  const onSubmit = (data: { telegram: IShopUpdateForm["telegram"] }) => {
    updateShopTelegramMutation.mutate(data.telegram);
  };

  if (isLoading) {
    return <LayoutLoader />;
  }

  if (!data?.data) {
    return <Navigate to="/dashboard/shops" />;
  }

  const initialValues = {
    telegram: {
      token: data?.data?.telegram.token,
      menu_text: data?.data?.telegram.menu_text,
      menu_url: data?.data?.telegram.menu_url,
    },
  };

  return (
    <div>
      <ShopTelegramForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        isLoading={updateShopTelegramMutation.isPending}
      />
    </div>
  );
};

export default ShopTelegramEditPage;
