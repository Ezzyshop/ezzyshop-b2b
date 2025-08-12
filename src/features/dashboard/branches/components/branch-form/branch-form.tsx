import { useState } from "react";
import { useForm } from "react-hook-form";
import { IBranchForm } from "../../utils/branches.interface";
import { joiResolver } from "@hookform/resolvers/joi";
import { createBranchValidator } from "../../utils/branch.validator";
import { useTranslation } from "react-i18next";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button/button";
import { LanguageSelectTab } from "@/components/form/language-select-tab";
import { useShopContext } from "@/contexts";
import { LanguageType } from "@/features/moderator/shops/utils";
import { YandexMap } from "@/components/yandex-map/yandex-map";

interface IProps {
  onSubmit: (data: IBranchForm) => void;
  isLoading: boolean;
  initialValues?: IBranchForm;
}

export const BranchForm = ({ onSubmit, isLoading, initialValues }: IProps) => {
  const { shop } = useShopContext();
  const { t } = useTranslation();

  const [activeLanguage, setActiveLanguage] = useState<LanguageType>(
    shop.languages.find((lang) => lang.is_main)?.type || LanguageType.Uz
  );

  const form = useForm<IBranchForm>({
    resolver: joiResolver(createBranchValidator),
    defaultValues:
      initialValues ||
      ({
        name: { uz: undefined, en: undefined, ru: undefined },
        address: { address: "", lat: 41.311081, lng: 69.240073 },
        pickup_enabled: false,
        delivery_enabled: false,
        notes: "",
      } as unknown as IBranchForm),
  });

  const handleSubmit = (data: IBranchForm) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 p-6 overflow-y-auto"
      >
        <LanguageSelectTab
          activeLanguage={activeLanguage}
          setActiveLanguage={setActiveLanguage}
        />

        <div className="space-y-4">
          <FormField
            key={`name-${activeLanguage}`}
            control={form.control}
            name={`name.${activeLanguage}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired={activeLanguage === LanguageType.Uz}>
                  {t("dashboard.products.name")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder={t("dashboard.branches.enter_name")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="pickup_enabled"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>{t("dashboard.branches.pickup_enabled")}</FormLabel>
                <div className="text-sm text-muted-foreground">
                  {t("dashboard.branches.pickup_enabled_description")}
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="delivery_enabled"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>
                  {t("dashboard.branches.delivery_enabled")}
                </FormLabel>
                <div className="text-sm text-muted-foreground">
                  {t("dashboard.branches.delivery_enabled_description")}
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dashboard.settings.address.address")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value}
                  placeholder={t("dashboard.settings.address.enter_address")}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <YandexMap
              className="rounded-xl overflow-hidden"
              height="300px"
              initialCoordinates={[
                Number(field.value?.lat ?? 0),
                Number(field.value?.lng ?? 0),
              ]}
              onLocationSelect={({ coordinates, address }) => {
                form.setValue("address.address", address);
                field.onChange({
                  ...field.value,
                  lat: coordinates[0],
                  lng: coordinates[1],
                  address,
                });
              }}
            />
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dashboard.branches.notes")}</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder={t("dashboard.branches.notes_placeholder")}
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {t("common.save")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            {t("common.form_reset")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
