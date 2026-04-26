import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { IShopUpdateForm, IWorkHours } from "@/features/moderator/shops/utils";
import { UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

const DAYS: { key: keyof IWorkHours; label: string }[] = [
  { key: "monday", label: "Dushanba" },
  { key: "tuesday", label: "Seshanba" },
  { key: "wednesday", label: "Chorshanba" },
  { key: "thursday", label: "Payshanba" },
  { key: "friday", label: "Juma" },
  { key: "saturday", label: "Shanba" },
  { key: "sunday", label: "Yakshanba" },
];

interface IProps {
  form: UseFormReturn<IShopUpdateForm>;
}

const DayRow = ({ dayKey, label, form }: { dayKey: keyof IWorkHours; label: string; form: UseFormReturn<IShopUpdateForm> }) => {
  const isOpen = useWatch({ control: form.control, name: `work_hours.${dayKey}.is_open` });

  return (
    <div className="flex items-center gap-4 py-3 border-b last:border-0">
      <div className="w-28 text-sm font-medium">{label}</div>

      <FormField
        control={form.control}
        name={`work_hours.${dayKey}.is_open`}
        render={({ field }) => (
          <FormItem className="flex items-center gap-2 space-y-0">
            <FormControl>
              <Switch
                checked={!!field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="text-sm text-muted-foreground cursor-pointer">
              {field.value ? "Ochiq" : "Yopiq"}
            </FormLabel>
          </FormItem>
        )}
      />

      {isOpen && (
        <div className="flex items-center gap-2 ml-auto">
          <FormField
            control={form.control}
            name={`work_hours.${dayKey}.open`}
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input type="time" className="w-32" {...field} value={field.value ?? "09:00"} />
                </FormControl>
              </FormItem>
            )}
          />
          <span className="text-muted-foreground text-sm">–</span>
          <FormField
            control={form.control}
            name={`work_hours.${dayKey}.close`}
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input type="time" className="w-32" {...field} value={field.value ?? "18:00"} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export const WorkHoursSection = ({ form }: IProps) => {
  const { t } = useTranslation();

  return (
    <Card className="p-6">
      <CardHeader className="px-0 pb-2">
        <CardTitle className="text-lg">
          {t("dashboard.settings.work_hours.title")}
        </CardTitle>
        <CardDescription>
          {t("dashboard.settings.work_hours.description")}
        </CardDescription>
      </CardHeader>

      <div>
        {DAYS.map(({ key, label }) => (
          <DayRow key={key} dayKey={key} label={label} form={form} />
        ))}
      </div>
    </Card>
  );
};
