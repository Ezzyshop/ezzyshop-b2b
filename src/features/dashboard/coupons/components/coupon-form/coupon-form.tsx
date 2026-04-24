import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { joiResolver } from "@hookform/resolvers/joi";
import { ICreateCouponForm } from "../../utils/coupon.interface";
import { CouponDiscountType } from "../../utils/coupon.enum";
import { createCouponValidator, updateCouponValidator } from "../../utils/coupon.validator";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { MultiSelect } from "@/components/ui/multi-select";
import { useQuery } from "@tanstack/react-query";
import { getShopCustomersQueryFn } from "@/api/queries";
import { useShopContext } from "@/contexts";

interface IProps {
  onSubmit: (data: ICreateCouponForm) => void;
  isLoading: boolean;
  defaultValues?: Partial<ICreateCouponForm>;
  hideCode?: boolean;
}

export const CouponForm = ({ onSubmit, isLoading, defaultValues, hideCode }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();

  const { data: customersData } = useQuery({
    queryKey: ["shop-customers", shop._id],
    queryFn: () => getShopCustomersQueryFn(shop._id),
    enabled: Boolean(shop._id),
  });

  const customers = customersData?.data ?? [];
  const customerOptions = customers.map((c) => ({
    label: `${c.full_name} (${c.phone})`,
    value: c._id,
  }));

  const form = useForm<ICreateCouponForm>({
    resolver: joiResolver(hideCode ? updateCouponValidator : createCouponValidator),
    defaultValues: {
      discount_type: CouponDiscountType.Percentage,
      min_order_price: 0,
      max_uses: null,
      max_uses_per_user: null,
      expires_at: null,
      allowed_users: [],
      ...defaultValues,
    },
  });

  const discountType = form.watch("discount_type");
  const allowedUsers = form.watch("allowed_users");

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

        <FormField
          control={form.control}
          name="max_uses_per_user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dashboard.coupons.max_uses_per_user")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("dashboard.coupons.max_uses_per_user_placeholder")}
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

        <FormItem>
          <FormLabel>{t("dashboard.coupons.allowed_users")}</FormLabel>
          <FormControl>
            <Controller
              name="allowed_users"
              control={form.control}
              render={({ field }) => (
                <MultiSelect
                  options={customerOptions}
                  defaultValue={field.value ?? []}
                  onValueChange={(values) => field.onChange(values)}
                  placeholder={t("dashboard.coupons.allowed_users_placeholder")}
                  maxCount={3}
                />
              )}
            />
          </FormControl>
          <p className="text-xs text-muted-foreground">
            {t("dashboard.coupons.allowed_users_hint")}
          </p>
          <FormMessage>{form.formState.errors.allowed_users?.message}</FormMessage>
        </FormItem>

        {!hideCode && allowedUsers && allowedUsers.length > 0 && (
          <FormField
            control={form.control}
            name="notification_message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("dashboard.coupons.notification_message")}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ""}
                    placeholder={t("dashboard.coupons.notification_message_placeholder")}
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("common.loading") : t("common.save")}
        </Button>
      </form>
    </Form>
  );
};
