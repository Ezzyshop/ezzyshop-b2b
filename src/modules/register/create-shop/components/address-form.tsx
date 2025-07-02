import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { YandexMap } from "@/components/yandex-map/yandex-map";
import { IShopForm } from "@/modules/moderator/shops/utils";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IProps {
  form: UseFormReturn<IShopForm>;
}

export const AddressForm = ({ form }: IProps) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">
        {t("register.create_shop.shop_address")}
      </h3>
      <p className="text-sm text-muted-foreground">
        {t("register.create_shop.shop_address_description")}
      </p>
      <Form {...form}>
        <FormField
          control={form.control}
          name="address.address"
          render={({ field }) => (
            <FormItem className="col-span-2 mb-4">
              <FormLabel>{t("register.create_shop.shop_address")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "register.create_shop.shop_address_placeholder"
                  )}
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <YandexMap
          initialCoordinates={[
            Number(form.getValues("address.lat")),
            Number(form.getValues("address.long")),
          ]}
          onLocationSelect={(data) => {
            form.setValue("address.lat", data.coordinates[0]);
            form.setValue("address.long", data.coordinates[1]);
            form.setValue("address.address", data.address);
          }}
        />
      </Form>
    </div>
  );
};
