import { FormControl, FormItem, FormMessage } from "@/components/ui/form/form";

import { FormField, FormLabel } from "@/components/ui/form/form";
import { IDeliveryMethodForm } from "../../../utils/delivery-methods.interface";
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";

interface IProps {
  form: UseFormReturn<IDeliveryMethodForm>;
}

export const PickupTypeForm = ({ form }: IProps) => {
  const { t } = useTranslation();

  return (
    <FormField
      control={form.control}
      name="pickup_location"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {t("dashboard.delivery-methods.pickup_location")}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={t(
                "dashboard.delivery-methods.pickup_location_placeholder"
              )}
              {...field}
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
