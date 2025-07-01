import { PropsWithChildren, useCallback, useMemo } from "react";
import { RegisterShopContext } from "./register-shop.context";
import { useForm } from "react-hook-form";
import {
  BusinessType,
  IShopForm,
  shopCreateSchema,
  ShopPlatform,
} from "@/modules/moderator/shops/utils";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createShopMutationFn } from "@/api/mutations";
import { useNavigate } from "react-router-dom";
import { RegisterShopLayout } from "@/layouts/register-shop.layout";

export const RegisterShopContextProvider = ({
  children,
}: PropsWithChildren) => {
  const navigate = useNavigate();

  const form = useForm<IShopForm>({
    defaultValues: {
      business_type: BusinessType.OnlineStore,
      platform: ShopPlatform.Telegram,
      currency: undefined,
      name: undefined,
      logo: undefined,
      telegram: {
        token: undefined,
        menu_text: undefined,
      },
      description: undefined,
      address: {
        address: "",
        lat: 41.2995,
        long: 69.2401,
      },
    },
    resolver: joiResolver(shopCreateSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: IShopForm) => createShopMutationFn(data),
    onSuccess: () => {
      navigate("/register/create-category");
    },
  });

  const handleSubmitForm = useCallback(
    (data: IShopForm) => {
      toast.promise(
        async () => {
          await mutateAsync(data);
        },
        {
          loading: "Kompaniya yaratilmoqda...",
          success: "Kompaniya yaratildi",
        }
      );
    },
    [mutateAsync]
  );

  const value = useMemo(
    () => ({
      form,
      handleSubmitForm,
      isPending,
    }),
    [form, handleSubmitForm, isPending]
  );

  return (
    <RegisterShopContext.Provider value={value}>
      <RegisterShopLayout>{children}</RegisterShopLayout>
    </RegisterShopContext.Provider>
  );
};
