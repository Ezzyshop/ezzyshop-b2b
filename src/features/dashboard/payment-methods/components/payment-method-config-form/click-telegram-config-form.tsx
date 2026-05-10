import { Button } from "@/components/ui/button/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { editClickTelegramConfigValidator } from "../../utils/payment-method.validator";
import { TClickTelegramConfigForm } from "../../utils/payment-methods.interface";

interface IProps {
  initialValues?: Partial<TClickTelegramConfigForm>;
  onSubmit: (data: TClickTelegramConfigForm) => void;
  isLoading: boolean;
}

export const ClickTelegramConfigForm = ({
  initialValues,
  onSubmit,
  isLoading,
}: IProps) => {
  const { t } = useTranslation();

  const form = useForm<TClickTelegramConfigForm>({
    resolver: joiResolver(editClickTelegramConfigValidator),
    defaultValues: {
      telegram_provider_token: initialValues?.telegram_provider_token ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6"
      >
        <FormField
          control={form.control}
          name="telegram_provider_token"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
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
