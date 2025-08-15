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
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
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
import { LanguageSelectTab } from "@/components/form/language-select-tab";
import { LanguageType } from "@/features/moderator/shops/utils";
import { useShopContext } from "@/contexts";
import { useState } from "react";

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
  const { shop } = useShopContext();
  const [activeLanguage, setActiveLanguage] = useState<LanguageType>(
    shop.languages.find((lang) => lang.is_main)?.type || LanguageType.Uz
  );

  const form = useForm<TPaymentMethodForm>({
    resolver: joiResolver(createPaymentMethodValidator),
    defaultValues: initialValues ?? {
      status: PaymentMethodStatus.Active,
      type: PaymentMethodType.Cash,
    },
  });

  const handleSubmit = (data: TPaymentMethodForm) => {
    onSubmit(data);
  };

  const type = form.watch("type");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 p-6"
      >
        <LanguageSelectTab
          activeLanguage={activeLanguage}
          setActiveLanguage={setActiveLanguage}
        />

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
                  <SelectItem value={PaymentMethodType.CardTransfer}>
                    {t("dashboard.payment-methods.type_card_transfer")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`name.${activeLanguage}`}
          key={`name-${activeLanguage}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                {t("dashboard.delivery-methods.name")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("dashboard.delivery-methods.name_placeholder")}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`instructions.${activeLanguage}`}
          key={`instructions-${activeLanguage}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {type === PaymentMethodType.CardTransfer
                  ? t("dashboard.payment-methods.card_number")
                  : t("dashboard.payment-methods.instructions")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    type === PaymentMethodType.CardTransfer
                      ? t("dashboard.payment-methods.card_number_placeholder")
                      : t("dashboard.payment-methods.instructions_placeholder")
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
