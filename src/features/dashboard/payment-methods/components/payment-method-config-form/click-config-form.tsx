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
import { editClickConfigValidator } from "../../utils/payment-method.validator";
import { TClickConfigForm } from "../../utils/payment-methods.interface";
import { WebhookUrlDisplay } from "./webhook-url-display";

interface IProps {
  paymentMethodId: string;
  initialValues?: Partial<TClickConfigForm>;
  onSubmit: (data: TClickConfigForm) => void;
  isLoading: boolean;
}

export const ClickConfigForm = ({
  paymentMethodId,
  initialValues,
  onSubmit,
  isLoading,
}: IProps) => {
  const { t } = useTranslation();
  const apiBase = import.meta.env.VITE_PUBLIC_API ?? "";
  const prepareUrl = `${apiBase}/payments/click/${paymentMethodId}/prepare`;
  const completeUrl = `${apiBase}/payments/click/${paymentMethodId}/complete`;

  const form = useForm<TClickConfigForm>({
    resolver: joiResolver(editClickConfigValidator),
    defaultValues: {
      service_id: initialValues?.service_id ?? "",
      merchant_id: initialValues?.merchant_id ?? "",
      merchant_user_id: initialValues?.merchant_user_id ?? "",
      secret_key: initialValues?.secret_key ?? "",
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
            {t("dashboard.payment-methods.click.webhook_title")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("dashboard.payment-methods.click.webhook_description")}
          </p>
          <WebhookUrlDisplay
            label={t("dashboard.payment-methods.click.prepare_url")}
            url={prepareUrl}
          />
          <WebhookUrlDisplay
            label={t("dashboard.payment-methods.click.complete_url")}
            url={completeUrl}
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
          name="merchant_user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.payment-methods.merchant_user_id")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "dashboard.payment-methods.merchant_user_id_placeholder"
                  )}
                  {...field}
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
                  type="password"
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
