import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button/button";
import { Switch } from "@/components/ui/switch";
import { joiResolver } from "@hookform/resolvers/joi";
import { IStaffForm } from "../../utils/staff.interface";
import { UserFormBasicInformation } from "@/features/moderator/users/components/user-form/user-form-sections/basic-information";
import { IUserForm } from "@/lib";
import { staffValidator } from "../../utils/staff.validator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getRolesQueryFn } from "@/api/queries";
import { useContext } from "react";
import { ShopContext } from "@/contexts/shop-context/shop.context";

interface IProps {
  initialValues?: IStaffForm;
  onSubmit: (data: IStaffForm) => void;
  isLoading: boolean;
  shopId?: string;
}

export const StaffForm = ({ onSubmit, initialValues, isLoading, shopId }: IProps) => {
  const { t } = useTranslation();
  const shopContext = useContext(ShopContext);
  const resolvedShopId = shopId ?? shopContext?.shop._id;

  const form = useForm<IStaffForm>({
    defaultValues: { isAdmin: false, roleId: undefined, ...initialValues },
    resolver: joiResolver(staffValidator),
  });

  const isAdmin = form.watch("isAdmin");

  const { data: rolesData } = useQuery({
    queryKey: ["roles", resolvedShopId],
    queryFn: () => getRolesQueryFn(resolvedShopId!),
    enabled: Boolean(resolvedShopId) && !isAdmin,
  });

  const roles = rolesData?.data || [];

  return (
    <Form {...form}>
      <form
        className="p-4 flex-grow flex flex-col space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <UserFormBasicInformation
          form={form as unknown as UseFormReturn<IUserForm>}
          hideRoles
        />

        <FormField
          control={form.control}
          name="isAdmin"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>{t("dashboard.staffs.make_admin")}</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      if (checked) form.setValue("roleId", undefined);
                    }}
                  />
                </FormControl>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("dashboard.staffs.make_admin_description")}
              </p>
            </FormItem>
          )}
        />

        {!isAdmin && (
          <FormField
            control={form.control}
            name="roleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>{t("dashboard.staffs.role")}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("dashboard.staffs.role_placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role._id} value={role._id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <DrawerFooter className="flex flex-col gap-2 col-span-2 px-0">
          <Button type="submit" disabled={isLoading}>
            {t("common.save")}
          </Button>
          <DrawerClose asChild>
            <Button type="button" variant="outline">
              {t("common.cancel")}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </Form>
  );
};
