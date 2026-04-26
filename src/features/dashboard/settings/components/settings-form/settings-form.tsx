import { Form } from "@/components/ui/form/form";
import {
  IShopUpdateForm,
  updateMyShopSchema,
} from "@/features/moderator/shops/utils";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button } from "@/components/ui/button/button";

import { cn } from "@/lib";
import { SettingFormBasicInformation } from "./setting-form-sections/basic-information";
import { SettingFormSocialLinks } from "./setting-form-sections/social-links";
import { SettingFormAddressSection } from "./setting-form-sections/address-section";
import { NotificationSettingsForm } from "./setting-form-sections/notification-section";
import { WorkHoursSection } from "./setting-form-sections/work-hours";

interface IProps {
  shop: IShopUpdateForm;
  onSubmit: (data: IShopUpdateForm) => void;
  isLoading: boolean;
}

export const SettingsForm = ({ shop, onSubmit, isLoading }: IProps) => {
  const { t } = useTranslation();

  const form = useForm<IShopUpdateForm>({
    defaultValues: shop,
    resolver: joiResolver(updateMyShopSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SettingFormBasicInformation form={form} />

        <SettingFormSocialLinks form={form} />

        <NotificationSettingsForm form={form} />

        <WorkHoursSection form={form} />

        <SettingFormAddressSection form={form} />

        <div className={cn("grid grid-cols-2 gap-4")}>
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => form.reset()}
          >
            {t("common.clear")}
          </Button>

          <Button type="submit" disabled={isLoading || !form.formState.isDirty}>
            {t("common.save")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
