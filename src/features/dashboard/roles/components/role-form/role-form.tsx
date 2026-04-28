import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useTranslation } from "react-i18next";
import { IRoleForm } from "@/lib/types/permission.types";
import { roleFormValidator } from "../../utils/role.validator";
import { PermissionMatrixField } from "./permission-matrix";

interface IProps {
  initialValues?: IRoleForm;
  onSubmit: (data: IRoleForm) => void;
  isLoading: boolean;
}

export const RoleForm = ({ onSubmit, initialValues, isLoading }: IProps) => {
  const { t } = useTranslation();

  const form = useForm<IRoleForm>({
    defaultValues: { name: "", permissions: [], ...initialValues },
    resolver: joiResolver(roleFormValidator),
  });

  return (
    <Form {...form}>
      <form
        className="p-4 flex-grow flex flex-col space-y-6 overflow-y-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>{t("dashboard.roles.name")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t("dashboard.roles.name_placeholder")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>{t("dashboard.roles.permissions")}</FormLabel>
          <p className="text-sm text-muted-foreground mb-3">
            {t("dashboard.roles.permissions_description")}
          </p>
          <PermissionMatrixField form={form} />
        </div>

        <DrawerFooter className="flex flex-col gap-2 px-0">
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
