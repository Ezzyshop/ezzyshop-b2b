import { Form } from "@/components/ui/form/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button/button";

import { joiResolver } from "@hookform/resolvers/joi";
import { IStaffForm } from "../../utils/staff.interface";
import { UserFormBasicInformation } from "@/features/moderator/users/components/user-form/user-form-sections/basic-information";
import { IUserForm } from "@/lib";
import { staffValidator } from "../../utils/staff.validator";

interface IProps {
  initialValues?: IStaffForm;
  onSubmit: (data: IStaffForm) => void;
  isLoading: boolean;
}

export const StaffForm = ({ onSubmit, initialValues, isLoading }: IProps) => {
  const { t } = useTranslation();
  const form = useForm<IStaffForm>({
    defaultValues: initialValues,
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
