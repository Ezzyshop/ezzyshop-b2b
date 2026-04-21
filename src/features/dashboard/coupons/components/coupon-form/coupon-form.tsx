import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { joiResolver } from "@hookform/resolvers/joi";
import { ICreateCouponForm } from "../../utils/coupon.interface";
import { CouponDiscountType } from "../../utils/coupon.enum";
import { createCouponValidator, updateCouponValidator } from "../../utils/coupon.validator";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IProps {
  onSubmit: (data: ICreateCouponForm) => void;
  isLoading: boolean;
  defaultValues?: Partial<ICreateCouponForm>;
  hideCode?: boolean;
}

export const CouponForm = ({ onSubmit, isLoading, defaultValues, hideCode }: IProps) => {
  const { t } = useTranslation();

  const form = useForm<ICreateCouponForm>({
    resolver: joiResolver(hideCode ? updateCouponValidator : createCouponValidator),
    defaultValues: {
      discount_type: CouponDiscountType.Percentage,
      min_order_price: 0,
      max_uses: null,
      expires_at: null,
      ...defaultValues,
    },
  });

  const discountType = form.watch("discount_type");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-4">
        {!hideCode && (
          <FormItem>
            <FormLabel>{t("dashboard.coupons.code")}</FormLabel>
            <FormControl>
              <Controller
                name="code"
                control={form.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                    placeholder={t("dashboard.coupons.enter_code")}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{form.formState.errors.code?.message}</FormMessage>
          </FormItem>
        )}

        <FormField
          control={form.control}
          name="discount_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dashboard.coupons.discount_type")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={CouponDiscountType.Percentage}>
                    {t("dashboard.coupons.type_percentage")}
                  </SelectItem>
                  <SelectItem value={CouponDiscountType.Fixed}>
                    {t("dashboard.coupons.type_fixed")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discount_value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {discountType === CouponDiscountType.Percentage
                  ? `${t("dashboard.coupons.discount_value")} (%)`
                  : t("dashboard.coupons.discount_value")}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="min_order_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dashboard.coupons.min_order_price")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="max_uses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dashboard.coupons.max_uses")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("dashboard.coupons.max_uses_placeholder")}
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(e.target.value === "" ? null : Number(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>{t("dashboard.coupons.expires_at")}</FormLabel>
          <FormControl>
            <Controller
              name="expires_at"
              control={form.control}
              render={({ field }) => (
                <DatePicker
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date.toISOString())}
                  placeholder={t("dashboard.coupons.expires_at")}
                />
              )}
            />
          </FormControl>
          <FormMessage>{form.formState.errors.expires_at?.message}</FormMessage>
        </FormItem>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("common.loading") : t("common.save")}
        </Button>
      </form>
    </Form>
  );
};
