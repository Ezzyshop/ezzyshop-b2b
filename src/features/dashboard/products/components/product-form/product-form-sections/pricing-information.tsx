import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputWithPrefix } from "@/components/ui/input";
import { IProductForm } from "../../../utils/product.interface";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IProps {
  form: UseFormReturn<IProductForm, unknown, IProductForm>;
}

export const ProductFormPricingInformation = ({ form }: IProps) => {
  const { t } = useTranslation();
  return (
    <Card className="p-3 gap-2">
      <h3 className="text-lg font-semibold mb-2">
        {t("dashboard.products.pricing")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>{t("dashboard.products.price")}</FormLabel>
              <FormControl>
                <InputWithPrefix
                  {...field}
                  prefix="UZS"
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="compare_at_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dashboard.products.compare_at_price")}</FormLabel>
              <FormControl>
                <InputWithPrefix
                  {...field}
                  prefix="UZS"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
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
