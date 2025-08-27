import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IShopUpdateForm } from "@/features/moderator/shops/utils";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IProps {
  form: UseFormReturn<IShopUpdateForm>;
}

export const NotificationSettingsForm = ({ form }: IProps) => {
  const { t } = useTranslation();
  return (
    <Card className="p-6">
      <CardHeader className="px-0">
        <CardTitle className="text-lg">
          {t("dashboard.settings.notification.title")}
        </CardTitle>
        <CardDescription>
          {t("dashboard.settings.notification.description")}
        </CardDescription>
      </CardHeader>

      <div className="grid grid-cols-2">
        <FormField
          control={form.control}
          name="telegram_group_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("dashboard.settings.notification.telegram-chat-id")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value}
                  placeholder={t(
                    "dashboard.settings.notification.telegram-chat-id-placeholder"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="max-w-md bg-primary/20 border border-primary rounded-xl px-4 py-3 text-primary-foreground mt-3 text-sm col-span-2">
          {t("dashboard.settings.notification.instructions.telegram", {
            bot: "@ezzyshopbot",
          })}
        </p>
      </div>
    </Card>
  );
};
