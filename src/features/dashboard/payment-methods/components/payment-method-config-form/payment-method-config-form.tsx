import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { TClickPaymentMethodConfigForm } from "../../utils/payment-methods.interface";
import { editClickPaymentMethodConfigValidator } from "../../utils/payment-method.validator";

interface IProps {
  initialValues?: TClickPaymentMethodConfigForm;
  onSubmit: (data: TClickPaymentMethodConfigForm) => void;
  isLoading: boolean;
}

export const PaymentMethodConfigForm = ({
  onSubmit,
  isLoading,
  initialValues,
}: IProps) => {
  const { t } = useTranslation();

  const form = useForm<TClickPaymentMethodConfigForm>({
    resolver: joiResolver(editClickPaymentMethodConfigValidator),
    defaultValues: initialValues ?? {},
  });

  const handleSubmit = (data: TClickPaymentMethodConfigForm) => {
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
          name="merchant_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.payment-methods.merchant_id")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "dashboard.payment-methods.merchant_id_placeholder"
                  )}
                  {...field}
                />
              </FormControl>
              {form.formState.errors.merchant_id && (
                <p className="text-destructive text-sm">
                  {t(form.formState.errors.merchant_id.message ?? "")}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="service_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.payment-methods.service_id")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "dashboard.payment-methods.service_id_placeholder"
                  )}
                  {...field}
                />
              </FormControl>
              {form.formState.errors.service_id && (
                <p className="text-destructive text-sm">
                  {t(form.formState.errors.service_id.message ?? "")}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="merchant_user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("dashboard.payment-methods.merchant_user_id")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "dashboard.payment-methods.merchant_user_id_placeholder"
                  )}
                  {...field}
                  value={field.value ?? undefined}
                />
              </FormControl>
              {form.formState.errors.merchant_user_id && (
                <p className="text-destructive text-sm">
                  {t(form.formState.errors.merchant_user_id.message ?? "")}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secret_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.payment-methods.secret_key")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "dashboard.payment-methods.secret_key_placeholder"
                  )}
                  {...field}
                />
              </FormControl>
              {form.formState.errors.secret_key && (
                <p className="text-destructive text-sm">
                  {t(form.formState.errors.secret_key.message ?? "")}
                </p>
              )}
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
