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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { getCurrenciesQueryFn } from "@/api/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const { data: currencies } = useQuery({
    queryKey: ["currencies"],
    queryFn: () => getCurrenciesQueryFn(),
  });

  const form = useForm<IDeliveryMethodForm>({
    resolver: joiResolver(deliveryMethodSchema),
    defaultValues: initialValues ?? {
      name: {
        uz: "",
        ru: undefined,
        en: undefined,
      },
      price: 0,
      currency: undefined,
      estimated_days: 0,
      pickup_location: undefined,
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
        {/* Name fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name.uz"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>
                  {t("dashboard.delivery-methods.name")} (UZ)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(
                      "dashboard.delivery-methods.name_placeholder"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name.ru"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("dashboard.delivery-methods.name")} (RU)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(
                      "dashboard.delivery-methods.name_placeholder"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="name.en"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dashboard.delivery-methods.name")} (EN)</FormLabel>
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

        {/* Price and Currency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>
                  {t("dashboard.delivery-methods.price")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
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
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>
                  {t("dashboard.delivery-methods.currency")}
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("dashboard.delivery-methods.currency")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies?.data.map((currency) => (
                        <SelectItem key={currency._id} value={currency._id}>
                          {currency.symbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Estimated Days */}
        <FormField
          control={form.control}
          name="estimated_days"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.delivery-methods.estimated_days")}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pickup Location */}
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
