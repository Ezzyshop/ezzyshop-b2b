import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { UseFormReturn } from "react-hook-form";
import { IProductForm } from "../../../utils/product.interface";
import { Switch } from "@/components/ui/switch";
import { ProductStatus } from "../../../utils/product.enum";
import { useTranslation } from "react-i18next";
import { InputWithPrefix } from "@/components/ui/input";

interface IProps {
  form: UseFormReturn<IProductForm, unknown, IProductForm>;
}

export const ProductFormSettings = ({ form }: IProps) => {
  const { t } = useTranslation();
  return (
    <Card className="p-3 gap-2">
      <h3 className="text-lg font-semibold mb-2">
        {t("dashboard.products.settings")}
      </h3>

      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <div className="space-y-0.5">
              <FormLabel>{t("dashboard.products.status")}</FormLabel>
              <div className="text-sm text-muted-foreground">
                {t("dashboard.products.status_description")}
              </div>
            </div>
            <FormControl>
              <Switch
                checked={field.value === ProductStatus.ACTIVE}
                onCheckedChange={(checked) =>
                  field.onChange(
                    checked ? ProductStatus.ACTIVE : ProductStatus.INACTIVE
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="delivery_time"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <div className="space-y-0.5">
              <FormLabel>{t("dashboard.products.delivery_time")}</FormLabel>
              <div className="text-sm text-muted-foreground">
                {t("dashboard.products.delivery_time_description")}
              </div>
            </div>
            <FormControl>
              <InputWithPrefix
                prefix="kun ichida"
                type="number"
                placeholder={t("dashboard.products.delivery_time_placeholder")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Card>
  );
};
