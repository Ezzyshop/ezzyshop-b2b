import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { IShopUpdateForm } from "@/features/moderator/shops/utils";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IProps {
  form: UseFormReturn<IShopUpdateForm>;
}

export const SettingFormTelegramConfiguration = ({ form }: IProps) => {
  const { t } = useTranslation();
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        {t("dashboard.settings.telegram_configuration.title")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="telegram.menu_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.settings.telegram_configuration.menu_name")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder={t(
                    "dashboard.settings.telegram_configuration.enter_menu_name"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
};
