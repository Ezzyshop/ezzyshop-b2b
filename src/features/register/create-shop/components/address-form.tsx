import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { YandexMap } from "@/components/yandex-map/yandex-map";
import { IShopForm } from "@/features/moderator/shops/utils";
import { UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IProps {
  form: UseFormReturn<IShopForm>;
}

export const AddressForm = ({ form }: IProps) => {
  const { t } = useTranslation();
  const addressValue = useWatch({
    control: form.control,
    name: "address.address",
  });

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
                  value={addressValue || ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <YandexMap
              className="rounded-xl overflow-hidden"
              height="400px"
              initialCoordinates={[
                Number(field.value.lat ?? 0),
                Number(field.value.long ?? 0),
              ]}
              onLocationSelect={({ coordinates, address }) => {
                const updatedAddress = {
                  ...field.value,
                  lat: coordinates[0],
                  long: coordinates[1],
                  address,
                };
                form.setValue("address", updatedAddress, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
          )}
        />
      </Form>
    </div>
  );
};
