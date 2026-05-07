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
      social_links: shop.social_links,
      name: shop.name,
      logo: shop.logo,
      description: shop.description,
      languages: shop.languages,
      brand_color: shop.brand_color,
      work_hours_indicator_color: shop.work_hours_indicator_color ?? "#F59E0B",
      telegram_group_id: shop.telegram_group_id,
      work_hours: shop.work_hours ?? {
        monday: { is_open: true, open: "09:00", close: "18:00" },
        tuesday: { is_open: true, open: "09:00", close: "18:00" },
        wednesday: { is_open: true, open: "09:00", close: "18:00" },
        thursday: { is_open: true, open: "09:00", close: "18:00" },
        friday: { is_open: true, open: "09:00", close: "18:00" },
        saturday: { is_open: true, open: "09:00", close: "18:00" },
        sunday: { is_open: true, open: "09:00", close: "18:00" },
      },
      eta: shop.eta,
      homepage_layout: shop.homepage_layout,
    };
  }, [shop]);

  return (
    <SettingsForm
      shop={shopInitialValues}
      shopId={shop._id}
      onSubmit={updateShop}
      isLoading={isPending}
    />
  );
};

export default SettingsPage;
