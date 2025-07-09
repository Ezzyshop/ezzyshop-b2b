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
import { LanguageType } from "@/features/moderator/shops/utils";

interface IProps {
  form: UseFormReturn<IProductForm, unknown, IProductForm>;
  activeLanguage: LanguageType;
}

export const ProductFormBasicInformation = ({
  form,
  activeLanguage,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <Card className="p-3 gap-2">
      <h3 className="text-lg font-semibold mb-2">
        {t("dashboard.products.basic_information")}
      </h3>

      <div className="space-y-4">
        <FormField
          key={`name-${activeLanguage}`}
          control={form.control}
          name={`name.${activeLanguage}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired={activeLanguage === LanguageType.Uz}>
                {t("dashboard.products.name")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder={t("dashboard.products.enter_name")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          key={`description-${activeLanguage}`}
          control={form.control}
          name={`description.${activeLanguage}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dashboard.products.description")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder={t("dashboard.products.enter_description")}
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
