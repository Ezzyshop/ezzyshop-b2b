import { useTranslation } from "react-i18next";
import { IDeliveryMethodForm } from "../../utils/delivery-methods.interface";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { deliveryMethodSchema } from "../../utils/delivery-methods.validator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LanguageSelectTab } from "@/components/form/language-select-tab";
import { LanguageType } from "@/features/moderator/shops/utils";
import { useState } from "react";
import { useShopContext } from "@/contexts";
import { DeliveryMethodType } from "../../utils/delivery-methods.enum";
import { DeliveryTypeForm } from "./delivery-method-types/delivery-type-form";
import { PickupTypeForm } from "./delivery-method-types/pickup-type-form";
import { Input } from "@/components/ui/input";

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
    resolver: joiResolver(deliveryMethodSchema),
    defaultValues: initialValues ?? {
      name: {
        uz: "",
        ru: undefined,
        en: undefined,
      },
      price: 0,
      estimated_days: undefined,
      pickup_location: undefined,
      deliveryType: undefined,
      initial_km: undefined,
      initial_km_price: undefined,
      every_km_price: undefined,
      min_order_price: undefined,
      type: DeliveryMethodType.Pickup,
      estimated_day_prefix: undefined,
    },
  });

  console.log(form.formState.errors);

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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.delivery-methods.type")}
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("dashboard.delivery-methods.type")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={DeliveryMethodType.Pickup}>
                      {t("dashboard.delivery-methods.pickup")}
                    </SelectItem>
                    <SelectItem value={DeliveryMethodType.Delivery}>
                      {t("dashboard.delivery-methods.delivery")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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

        {form.watch("type") === DeliveryMethodType.Delivery ? (
          <DeliveryTypeForm form={form} />
        ) : (
          <PickupTypeForm form={form} />
        )}

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
