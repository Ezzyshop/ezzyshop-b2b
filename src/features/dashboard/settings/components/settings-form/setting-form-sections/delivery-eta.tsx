import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { IShopUpdateForm } from "@/features/moderator/shops/utils";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IProps {
  form: UseFormReturn<IShopUpdateForm>;
}

const parseEta = (raw: unknown): number | undefined => {
  if (raw === "" || raw === null || raw === undefined) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
};

export const SettingFormDeliveryEta = ({ form }: IProps) => {
  const { t } = useTranslation();

  return (
    <Card className="p-6">
      <CardHeader className="p-0 mb-4">
        <CardTitle>
          {t("dashboard.settings.delivery_eta.title")}
        </CardTitle>
        <CardDescription>
          {t("dashboard.settings.delivery_eta.description")}
        </CardDescription>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="eta.min"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("dashboard.settings.delivery_eta.min")}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={600}
                  placeholder="25"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(parseEta(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eta.max"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("dashboard.settings.delivery_eta.max")}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={600}
                  placeholder="35"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(parseEta(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
};
