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
import { ImageUploadSingle } from "@/components/ui/image-upload";

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
        service_radius_km: undefined,
        image: "",
        working_hours: undefined,
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

          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>{t("dashboard.branches.image")}</FormLabel>
                <ImageUploadSingle
                  value={form.watch("image")}
                  onChange={(val) => form.setValue("image", val)}
                />
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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {t("dashboard.branches.working_hours")}
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {(
              [
                { key: "mon", label: t("dashboard.branches.monday") },
                { key: "tue", label: t("dashboard.branches.tuesday") },
                { key: "wed", label: t("dashboard.branches.wednesday") },
                { key: "thu", label: t("dashboard.branches.thursday") },
                { key: "fri", label: t("dashboard.branches.friday") },
                { key: "sat", label: t("dashboard.branches.saturday") },
                { key: "sun", label: t("dashboard.branches.sunday") },
              ] as const
            ).map((day) => {
              const isClosed = form.watch(
                `working_hours.${day.key}.closed` as const
              );
              return (
                <div
                  key={day.key}
                  className="grid grid-cols-1 md:grid-cols-4 items-center gap-3"
                >
                  <div className="font-medium">{day.label}</div>

                  <FormField
                    control={form.control}
                    name={`working_hours.${day.key}.open` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("dashboard.branches.open")}</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            step="60"
                            disabled={!!isClosed}
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`working_hours.${day.key}.close` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("dashboard.branches.close")}</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            step="60"
                            disabled={!!isClosed}
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`working_hours.${day.key}.closed` as const}
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between md:justify-start md:gap-3">
                        <div className="space-y-0.5">
                          <FormLabel>
                            {t("dashboard.branches.closed")}
                          </FormLabel>
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
                </div>
              );
            })}
          </div>
        </div>

        <div className=" space-y-4">
          <h3 className="text-lg font-semibold">
            {t("dashboard.settings.address.title")}
          </h3>
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
        </div>

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
