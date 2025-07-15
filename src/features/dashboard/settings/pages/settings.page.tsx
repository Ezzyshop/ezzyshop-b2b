import { updateShopMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { IShopUpdateForm, IShopForm } from "@/features/moderator/shops/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SettingsForm } from "../components/settings-form/settings-form";
import { useMemo } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const SettingsPage = () => {
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate: updateShop, isPending } = useMutation({
    mutationFn: (data: IShopUpdateForm) =>
      updateShopMutationFn(shop._id, data as unknown as IShopForm),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shop", shop._id],
      });
      queryClient.invalidateQueries({
        queryKey: ["shops"],
      });
      toast.success(t("common.success"));
    },
  });

  const shopInitialValues: IShopUpdateForm = useMemo(() => {
    return {
      address: {
        address: shop.address.address,
        lat: shop.address.lat,
        long: shop.address.long,
      },
      currency: shop.currency._id,
      telegram: {
        menu_text: shop.telegram.menu_text,
      },
      social_links: shop.social_links,
      name: shop.name,
      logo: shop.logo,
      description: shop.description,
      languages: shop.languages,
    };
  }, [shop]);

  return (
    <SettingsForm
      shop={shopInitialValues}
      onSubmit={updateShop}
      isLoading={isPending}
    />
  );
};

export default SettingsPage;
