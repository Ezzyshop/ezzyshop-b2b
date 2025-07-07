import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TPaymentMethodForm } from "../../utils/payment-methods.interface";
import { createPaymentMethodValidator } from "../../utils/payment-method.validator";
import {
  PaymentMethodStatus,
  PaymentMethodType,
} from "../../utils/payment-method.enum";

interface IProps {
  initialValues?: TPaymentMethodForm;
  onSubmit: (data: TPaymentMethodForm) => void;
  isLoading: boolean;
}

export const PaymentMethodForm = ({
  onSubmit,
  isLoading,
  initialValues,
}: IProps) => {
  const { t } = useTranslation();

  const form = useForm<TPaymentMethodForm>({
    resolver: joiResolver(createPaymentMethodValidator),
    defaultValues: initialValues ?? {
      name: {
        uz: "",
        ru: undefined,
        en: undefined,
      },
      instructions: {
        uz: undefined,
        ru: undefined,
        en: undefined,
      },
      status: PaymentMethodStatus.Active,
      type: PaymentMethodType.Cash,
    },
  });

  const handleSubmit = (data: TPaymentMethodForm) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 p-6"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.payment-methods.type")}
              </FormLabel>
              <FormMessage />
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={t("dashboard.payment-methods.type")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PaymentMethodType.Cash}>
                    {t("dashboard.payment-methods.type_cash")}
                  </SelectItem>
                  <SelectItem value={PaymentMethodType.Click}>
                    {t("dashboard.payment-methods.type_click")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="instructions.uz"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>
                  {t("dashboard.payment-methods.instructions")} (UZ)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(
                      "dashboard.payment-methods.instructions_placeholder"
                    )}
                    {...field}
                    value={field.value ?? undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instructions.ru"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("dashboard.payment-methods.instructions")} (RU)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(
                      "dashboard.payment-methods.instructions_placeholder"
                    )}
                    {...field}
                    value={field.value ?? undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="instructions.en"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("dashboard.payment-methods.instructions")} (EN)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "dashboard.payment-methods.instructions_placeholder"
                  )}
                  {...field}
                  value={field.value ?? undefined}
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
