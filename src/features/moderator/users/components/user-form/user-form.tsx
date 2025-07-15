import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { updateUserValidator } from "../../utils/user.validator";
import { IUserForm } from "@/lib/interfaces/user.interface";
import { Form } from "@/components/ui/form/form";
import { Button } from "@/components/ui/button/button";

import { cn } from "@/lib/utils";

import { UserFormBasicInformation } from "./user-form-sections/basic-information";
import { UserFormChangePassword } from "./user-form-sections/passwords";

interface IProps {
  initialValues?: IUserForm;
  onSubmit: (data: IUserForm) => void;
  isLoading: boolean;
}

export const UserForm = ({ initialValues, onSubmit, isLoading }: IProps) => {
  const form = useForm<IUserForm>({
    defaultValues: initialValues || {
      full_name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
      photo: null,
      roles: [],
    },
    resolver: joiResolver(updateUserValidator),
  });

  const handleSubmit = (data: IUserForm) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <UserFormBasicInformation form={form} />

        <UserFormChangePassword form={form} />

        <div
          className={cn(
            "grid gap-4",
            initialValues ? "grid-cols-2" : "grid-cols-1"
          )}
        >
          {initialValues && (
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isLoading}
            >
              Formani Tozalash
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {initialValues
              ? "Foydalanuvchini Yangilash"
              : "Foydalanuvchi Yaratish"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
