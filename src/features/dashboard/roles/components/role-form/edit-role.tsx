import { Button } from "@/components/ui/button/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useTranslation } from "react-i18next";
import { updateRoleMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { EditIcon } from "lucide-react";
import { IRole, IRoleForm } from "@/lib/types/permission.types";
import { RoleForm } from "./role-form";

interface IProps {
  role: IRole;
}

export const EditRole = ({ role }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const updateRoleMutation = useMutation({
    mutationFn: (data: IRoleForm) => updateRoleMutationFn(shop._id, role._id, data),
    onSuccess: () => {
      toast.success(t("dashboard.roles.updated"));
      queryClient.invalidateQueries({ queryKey: ["roles", shop._id] });
      queryClient.invalidateQueries({ queryKey: ["my-role"] });
      setIsOpen(false);
    },
  });

  const initialValues: IRoleForm = {
    name: role.name,
    permissions: role.permissions,
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <EditIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full md:max-w-2xl">
        <DrawerHeader>
          <DrawerTitle>{t("dashboard.roles.edit")}</DrawerTitle>
          <DrawerDescription>{t("dashboard.roles.edit_description")}</DrawerDescription>
        </DrawerHeader>
        <RoleForm
          initialValues={initialValues}
          onSubmit={(data) => updateRoleMutation.mutate(data)}
          isLoading={updateRoleMutation.isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
