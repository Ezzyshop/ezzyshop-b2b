import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form/form";
import { Input, InputWithPrefix } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { IDeliveryMethodForm } from "../../../utils/delivery-methods.interface";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  DeliveryMethodDeliveryType,
  DeliveryMethodEstimatedDayPrefix,
} from "../../../utils/delivery-methods.enum";

interface IProps {
  form: UseFormReturn<IDeliveryMethodForm>;
}

export const DeliveryTypeForm = ({ form }: IProps) => {
  const { t } = useTranslation();

  const deliveryType = form.watch("deliveryType");

  return (
    <>
      <FormField
        control={form.control}
        name="deliveryType"
        render={({ field }) => (
          <FormItem>
            <FormLabel isRequired>
              {t("dashboard.delivery-methods.type")}
            </FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => field.onChange(value)}
                defaultValue={field.value || undefined}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={t("dashboard.delivery-methods.type")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DeliveryMethodDeliveryType.Free}>
                    {t("common.free")}
                  </SelectItem>
                  <SelectItem value={DeliveryMethodDeliveryType.Dynamic}>
                    {t("common.dynamic")}
                  </SelectItem>
                  <SelectItem value={DeliveryMethodDeliveryType.Fixed}>
                    {t("common.fixed")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {deliveryType === DeliveryMethodDeliveryType.Fixed && (
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.delivery-methods.price")}
              </FormLabel>
              <FormControl>
                <InputWithPrefix
                  prefix="UZS"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <div className="flex items-end gap-4">
        <FormField
          control={form.control}
          name="estimated_days"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel isRequired>
                {t("dashboard.delivery-methods.estimated_days")}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t(
                    "dashboard.delivery-methods.estimated_days_placeholder"
                  )}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estimated_day_prefix"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t(
                        "dashboard.delivery-methods.estimated_day_prefix"
                      )}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={DeliveryMethodEstimatedDayPrefix.Day}>
                      {t("dashboard.delivery-methods.estimated_day_prefix_day")}
                    </SelectItem>
                    <SelectItem value={DeliveryMethodEstimatedDayPrefix.Hour}>
                      {t(
                        "dashboard.delivery-methods.estimated_day_prefix_hour"
                      )}
                    </SelectItem>
                    <SelectItem value={DeliveryMethodEstimatedDayPrefix.Min}>
                      {t(
                        "dashboard.delivery-methods.estimated_day_prefix_minute"
                      )}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {deliveryType === DeliveryMethodDeliveryType.Dynamic && (
        <>
          <div className="flex items-center gap-3">
            <span>{t("dashboard.delivery-methods.initial_km_prefix")}</span>

            <FormField
              control={form.control}
              name="initial_km"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithPrefix
                      prefix="km"
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <span className="whitespace-nowrap">
              {t("dashboard.delivery-methods.initial_km_price_prefix")}
            </span>

            <FormField
              control={form.control}
              name="initial_km_price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithPrefix
                      prefix="UZS"
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-3">
            <span>{t("dashboard.delivery-methods.every_km_price_prefix")}</span>

            <FormField
              control={form.control}
              name="every_km_price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithPrefix
                      prefix="UZS"
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </>
      )}
    </>
  );
};
