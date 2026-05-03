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
          name="telegram_provider_token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("dashboard.payment-methods.telegram_provider_token")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "dashboard.payment-methods.telegram_provider_token_placeholder"
                  )}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              {form.formState.errors.telegram_provider_token && (
                <p className="text-destructive text-sm">
                  {t(
                    form.formState.errors.telegram_provider_token.message ?? ""
                  )}
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
