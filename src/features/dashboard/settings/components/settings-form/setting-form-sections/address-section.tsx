import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { YandexMap } from "@/components/yandex-map/yandex-map";
import { IShopUpdateForm } from "@/features/moderator/shops/utils";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IProps {
  form: UseFormReturn<IShopUpdateForm>;
}

export const SettingFormAddressSection = ({ form }: IProps) => {
  const { t } = useTranslation();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        {t("dashboard.settings.address.title")}
      </h3>
      <div className="grid grid-cols-1  gap-4">
        <FormField
          control={form.control}
          name="address.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dashboard.settings.address.address")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={form.watch("address.address")}
                  placeholder={t("dashboard.settings.address.enter_address")}
                  disabled
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
                field.onChange({
                  ...field.value,
                  lat: coordinates[0],
                  long: coordinates[1],
                  address,
                });
              }}
            />
          )}
        />
      </div>
    </Card>
  );
};
