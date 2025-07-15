import { getShopTelegramQueryFn } from "@/api/queries";
import { LayoutLoader } from "@/components/loaders/global-loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { IShopTelegramForm } from "../utils";
import { updateTelegramBotMutationFn } from "@/api/mutations";
import { toast } from "sonner";
import { ShopTelegramForm } from "../components/shop-telegram-form/shop-telegram-form";

export const ShopTelegramEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["telegram", id],
    queryFn: () => getShopTelegramQueryFn(id!),
  });

  const updateTelegramBotMutation = useMutation({
    mutationFn: (data: IShopTelegramForm) =>
      updateTelegramBotMutationFn(id!, data),
    onSuccess: () => {
      toast.success("Telegram sozlamalari yangilandi");
      navigate("/moderator/shops");
    },
  });

  const onSubmit = (data: IShopTelegramForm) => {
    updateTelegramBotMutation.mutate(data);
  };

  if (isLoading) {
    return <LayoutLoader />;
  }

  if (!data?.data) {
    return <Navigate to="/moderator/shops" />;
  }

  const initialValues = {
    token: data?.data?.token || "",
    menu_text: data?.data?.menu_text,
  };

  console.log(initialValues);

  return (
    <div>
      <ShopTelegramForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        isLoading={updateTelegramBotMutation.isPending}
      />
    </div>
  );
};

export default ShopTelegramEditPage;
