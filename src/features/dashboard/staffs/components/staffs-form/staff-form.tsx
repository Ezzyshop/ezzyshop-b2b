import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button/button";

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
import { UserRoles } from "@/lib/enums";

interface IProps {
  initialValues?: IStaffForm;
  onSubmit: (data: IStaffForm) => void;
  isLoading: boolean;
}

export const StaffForm = ({ onSubmit, initialValues, isLoading }: IProps) => {
  const { t } = useTranslation();
  const form = useForm<IStaffForm>({
    defaultValues: { role: UserRoles.Staff, ...initialValues },
    resolver: joiResolver(staffValidator),
  });

  return (
    <Form {...form}>
      <form
        className="p-4 flex-grow flex flex-col space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <UserFormBasicInformation
          form={form as unknown as UseFormReturn<IUserForm>}
          hideRoles
          hideEmail
        />

        <FormField
          control={form.control}
          name="role"
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
                  <SelectItem value={UserRoles.Staff}>
                    {t("dashboard.staffs.role_staff")}
                  </SelectItem>
                  <SelectItem value={UserRoles.Admin}>
                    {t("dashboard.staffs.role_admin")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <DrawerFooter className="flex flex-col gap-2 col-span-2">
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
