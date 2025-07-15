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

export const SettingFormSocialLinks = ({ form }: IProps) => {
  const { t } = useTranslation();
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        {t("dashboard.settings.social_links.title")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="social_links.telegram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telegram</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder={t(
                    "dashboard.settings.social_links.enter_telegram"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="social_links.instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("dashboard.settings.social_links.instagram")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder={t(
                    "dashboard.settings.social_links.enter_instagram"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="social_links.facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("dashboard.settings.social_links.facebook")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder={t(
                    "dashboard.settings.social_links.enter_facebook"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="social_links.twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("dashboard.settings.social_links.twitter")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder={t(
                    "dashboard.settings.social_links.enter_twitter"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="social_links.youtube"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>
                {t("dashboard.settings.social_links.youtube")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder={t(
                    "dashboard.settings.social_links.enter_youtube"
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
