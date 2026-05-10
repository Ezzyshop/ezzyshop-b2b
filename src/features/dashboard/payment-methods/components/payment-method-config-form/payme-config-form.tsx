import { Button } from "@/components/ui/button/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PaymentProviderMode } from "../../utils/payment-method.enum";
import { editPaymeConfigValidator } from "../../utils/payment-method.validator";
import { TPaymeConfigForm } from "../../utils/payment-methods.interface";
import { WebhookUrlDisplay } from "./webhook-url-display";

interface IProps {
  paymentMethodId: string;
  initialValues?: Partial<TPaymeConfigForm>;
  onSubmit: (data: TPaymeConfigForm) => void;
  isLoading: boolean;
}

export const PaymeConfigForm = ({
  paymentMethodId,
  initialValues,
  onSubmit,
  isLoading,
}: IProps) => {
  const { t } = useTranslation();
  const apiBase = import.meta.env.VITE_PUBLIC_API ?? "";
  const rpcUrl = `${apiBase}/payments/payme/${paymentMethodId}`;

  const form = useForm<TPaymeConfigForm>({
    resolver: joiResolver(editPaymeConfigValidator),
    defaultValues: {
      merchant_id: initialValues?.merchant_id ?? "",
      test_key: initialValues?.test_key ?? "",
      prod_key: initialValues?.prod_key ?? "",
      mode: initialValues?.mode ?? PaymentProviderMode.Test,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 overflow-y-auto"
      >
        <div className="rounded-md border bg-muted/30 p-4 space-y-3">
          <p className="text-sm font-semibold">
            {t("dashboard.payment-methods.payme.webhook_title")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("dashboard.payment-methods.payme.webhook_description")}
          </p>
          <WebhookUrlDisplay
            label={t("dashboard.payment-methods.payme.endpoint_url")}
            url={rpcUrl}
          />
        </div>

        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.payment-methods.mode")}
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={t("dashboard.payment-methods.mode")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PaymentProviderMode.Test}>
                    {t("dashboard.payment-methods.mode_test")}
                  </SelectItem>
                  <SelectItem value={PaymentProviderMode.Production}>
                    {t("dashboard.payment-methods.mode_production")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="merchant_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.payment-methods.payme.cashbox_id")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "dashboard.payment-methods.payme.cashbox_id_placeholder"
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
          name="test_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("dashboard.payment-methods.payme.test_key")}
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t(
                    "dashboard.payment-methods.payme.test_key_placeholder"
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
          name="prod_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("dashboard.payment-methods.payme.prod_key")}
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t(
                    "dashboard.payment-methods.payme.prod_key_placeholder"
                  )}
                  {...field}
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
