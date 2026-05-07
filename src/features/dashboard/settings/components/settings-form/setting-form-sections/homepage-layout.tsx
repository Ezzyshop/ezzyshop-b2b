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
} from "@/components/ui/form/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IShopUpdateForm } from "@/features/moderator/shops/utils";
import { HomepageLayout } from "@/features/moderator/shops/utils/shop.enum";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IProps {
  form: UseFormReturn<IShopUpdateForm>;
}

export const SettingFormHomepageLayout = ({ form }: IProps) => {
  const { t } = useTranslation();

  return (
    <Card className="p-6">
      <CardHeader className="p-0 mb-4">
        <CardTitle>
          {t("dashboard.settings.homepage_layout.title")}
        </CardTitle>
        <CardDescription>
          {t("dashboard.settings.homepage_layout.description")}
        </CardDescription>
      </CardHeader>

      <FormField
        control={form.control}
        name="homepage_layout"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("dashboard.settings.homepage_layout.label")}
            </FormLabel>
            <FormControl>
              <Select
                value={field.value ?? HomepageLayout.Classic}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={HomepageLayout.Classic}>
                    {t("dashboard.settings.homepage_layout.classic")}
                  </SelectItem>
                  <SelectItem value={HomepageLayout.Editorial}>
                    {t("dashboard.settings.homepage_layout.editorial")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Card>
  );
};
