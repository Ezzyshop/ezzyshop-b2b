import { useTranslation } from "react-i18next";
import { IDeliveryMethodForm } from "../../utils/delivery-methods.interface";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { createDeliveryMethodValidator } from "../../utils/delivery-methods.validator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Button } from "@/components/ui/button/button";

import { LanguageSelectTab } from "@/components/form/language-select-tab";
import { LanguageType } from "@/features/moderator/shops/utils";
import { useState } from "react";
import { useShopContext } from "@/contexts";
import { DeliveryTypeForm } from "./delivery-method-types/delivery-type-form";
import { Input } from "@/components/ui/input";
import {
  DeliveryMethodDeliveryType,
  DeliveryMethodEstimatedDayPrefix,
} from "../../utils/delivery-methods.enum";

interface IProps {
  initialValues?: IDeliveryMethodForm;
  onSubmit: (data: IDeliveryMethodForm) => void;
  isLoading: boolean;
}

export const DeliveryMethodForm = ({
  onSubmit,
  isLoading,
  initialValues,
}: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const [activeLanguage, setActiveLanguage] = useState<LanguageType>(
    shop.languages.find((lang) => lang.is_main)?.type || LanguageType.Uz
  );

  const form = useForm<IDeliveryMethodForm>({
    resolver: joiResolver(createDeliveryMethodValidator),
    defaultValues: initialValues ?? {
      estimated_day_prefix: DeliveryMethodEstimatedDayPrefix.Day,
      deliveryType: DeliveryMethodDeliveryType.Free,
      price: 0,
    },
  });

  const handleSubmit = (data: IDeliveryMethodForm) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 p-6"
      >
        <LanguageSelectTab
          activeLanguage={activeLanguage}
          setActiveLanguage={setActiveLanguage}
        />

        <FormField
          control={form.control}
          key={`name-${activeLanguage}`}
          name={`name.${activeLanguage}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.delivery-methods.name")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("dashboard.delivery-methods.name_placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DeliveryTypeForm form={form} />

        <FormField
          control={form.control}
          name="min_order_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.delivery-methods.min_order_price")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "dashboard.delivery-methods.min_order_price_placeholder"
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto"
          >
            {t("common.save")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
