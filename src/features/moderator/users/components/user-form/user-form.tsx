import { useForm, UseFormReturn } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  createUserValidator,
  updateUserValidator,
} from "../../utils/user.validator";
import { IUserCreateForm, IUserForm } from "@/lib/interfaces/user.interface";
import { Form } from "@/components/ui/form/form";
import { Button } from "@/components/ui/button/button";

import { cn } from "@/lib/utils";

import { UserFormBasicInformation } from "./user-form-sections/basic-information";
import { UserFormChangePassword } from "./user-form-sections/passwords";

interface IProps {
  initialValues?: IUserForm;
  onSubmit: (data: IUserForm | IUserCreateForm) => void;
  isLoading: boolean;
}

export const UserForm = ({ initialValues, onSubmit, isLoading }: IProps) => {
  const isEdit = Boolean(initialValues);

  const form = useForm<IUserCreateForm>({
    defaultValues: initialValues
      ? { ...initialValues, password: "", confirm_password: "" }
      : {
          full_name: "",
          phone: "",
          photo: null,
          roles: [],
          password: "",
          confirm_password: "",
        },
    resolver: joiResolver(isEdit ? updateUserValidator : createUserValidator),
  });

  const handleSubmit = (data: IUserCreateForm) => {
    if (isEdit) {
      const { password: _password, confirm_password: _confirm, ...rest } = data;
      void _password;
      void _confirm;
      onSubmit(rest);
      return;
    }
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <UserFormBasicInformation
          form={form as unknown as UseFormReturn<IUserForm>}
        />

        {!isEdit && <UserFormChangePassword form={form} />}

        <div
          className={cn("grid gap-4", isEdit ? "grid-cols-2" : "grid-cols-1")}
        >
          {isEdit && (
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
            {isEdit ? "Foydalanuvchini Yangilash" : "Foydalanuvchi Yaratish"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
