import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { RegisterShopContext } from "./register-shop.context";
import { useForm } from "react-hook-form";
import {
  BusinessType,
  IShop,
  IShopForm,
  LanguageType,
  shopCreateSchema,
  ShopPlatform,
} from "@/features/moderator/shops/utils";
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
  const [createdShop, setCreatedShop] = useState<IShop | null>(null);

  const form = useForm<IShopForm>({
    defaultValues: {
      business_type: BusinessType.OnlineStore,
      platform: ShopPlatform.Telegram,
      address: {
        address: "Ташкент, Национальный парк Узбекистана имени Алишера Навои",
        lat: 41.2995,
        long: 69.2401,
      },
      languages: [
        {
          type: LanguageType.Uz,
          is_main: true,
        },
      ],
    },

    resolver: joiResolver(shopCreateSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: IShopForm) => createShopMutationFn(data),
    onSuccess: (data) => {
      setCreatedShop(data.data.data as unknown as IShop);
      navigate("/register/create-platform");
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
      createdShop,
    }),
    [form, handleSubmitForm, isPending, createdShop]
  );

  return (
    <RegisterShopContext.Provider value={value}>
      <RegisterShopLayout>{children}</RegisterShopLayout>
    </RegisterShopContext.Provider>
  );
};
