import { getCurrenciesQueryFn } from "@/api/queries";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { ImageUploadSingle } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IShopUpdateForm } from "@/features/moderator/shops/utils";
import { SelectLanguage } from "@/features/register/create-shop/components/select-language";
import { useQuery } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IProps {
  form: UseFormReturn<IShopUpdateForm>;
}

export const SettingFormBasicInformation = ({ form }: IProps) => {
  const { t } = useTranslation();
  const { data: currencies } = useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrenciesQueryFn,
  });

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        {t("dashboard.settings.basic_information.title")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.settings.basic_information.name")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t(
                    "dashboard.settings.basic_information.enter_name"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.settings.basic_information.currency")}
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Valyutani tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies?.data?.map(
                      (currency: {
                        _id: string;
                        symbol: string;
                        name: string;
                      }) => (
                        <SelectItem key={currency._id} value={currency._id}>
                          {currency.symbol} - {currency.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>
                {t("dashboard.settings.basic_information.description")}
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder={t(
                    "dashboard.settings.basic_information.enter_description"
                  )}
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  {t("dashboard.settings.basic_information.logo")}
                </FormLabel>
                <FormControl>
                  <ImageUploadSingle
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="languages"
          render={({ field }) => (
            <FormItem className="h-fit">
              <FormLabel>
                {t("dashboard.settings.basic_information.languages")}
              </FormLabel>
              <FormControl>
                <SelectLanguage
                  values={field.value || []}
                  onChange={field.onChange}
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
