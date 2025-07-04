import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { IProductForm } from "../../../utils/product.interface";
import { useTranslation } from "react-i18next";

interface IProps {
  form: UseFormReturn<IProductForm, unknown, IProductForm>;
}

export const ProductFormBasicInformation = ({ form }: IProps) => {
  const { t } = useTranslation();
  return (
    <Card className="p-3 gap-2">
      <h3 className="text-lg font-semibold mb-2">
        {t("dashboard.products.basic_information")}
      </h3>

      {/* Product Name - Localized */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name.uz"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>
                  {t("dashboard.products.name")} (UZ)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("dashboard.products.enter_name")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name.en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("dashboard.products.name")} (EN)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("dashboard.products.enter_name")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name.ru"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>{t("dashboard.products.name")} (RU)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("dashboard.products.enter_name")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dashboard.products.description")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter product description"
                  rows={4}
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
