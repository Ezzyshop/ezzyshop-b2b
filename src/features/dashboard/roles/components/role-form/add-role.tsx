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
import { createRoleMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { IRoleForm } from "@/lib/types/permission.types";
import { RoleForm } from "./role-form";

export const AddRole = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const createRoleMutation = useMutation({
    mutationFn: (data: IRoleForm) => createRoleMutationFn(shop._id, data),
    onSuccess: () => {
      toast.success(t("dashboard.roles.created"));
      queryClient.invalidateQueries({ queryKey: ["roles", shop._id] });
      setIsOpen(false);
    },
  });

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button>
          <PlusCircle />
          <span className="hidden md:block">{t("dashboard.roles.create")}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full md:max-w-2xl">
        <DrawerHeader>
          <DrawerTitle>{t("dashboard.roles.create")}</DrawerTitle>
          <DrawerDescription>{t("dashboard.roles.create_description")}</DrawerDescription>
        </DrawerHeader>
        <RoleForm
          onSubmit={(data) => createRoleMutation.mutate(data)}
          isLoading={createRoleMutation.isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
