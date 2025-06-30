import { IShopForm } from "@/modules/moderator/shops/utils";
import { ShopForm } from "../components/shop-form";
import { createShopMutationFn } from "@/api/mutations/shops.mutation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const CreateShopPage = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: IShopForm) => createShopMutationFn(data),
    onSuccess: () => {
      navigate("/register/create-bot");
    },
  });

  const handleSubmitForm = (data: IShopForm) => {
    toast.promise(
      async () => {
        await mutateAsync(data);
      },
      {
        loading: "Kompaniya yaratilmoqda...",
        success: "Kompaniya yaratildi",
      }
    );
  };

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Kompaniya yaratish</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Kompaniya yaratish uchun ma'lumotlarni kiriting
      </p>
      <ShopForm onSubmit={handleSubmitForm} isLoading={isPending} />
    </div>
  );
};

export default CreateShopPage;
