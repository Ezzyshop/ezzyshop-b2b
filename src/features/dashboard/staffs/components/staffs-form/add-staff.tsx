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
import { createStaffMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { IStaffForm } from "../../utils/staff.interface";
import { StaffForm } from "./staff-form";

export const AddStaff = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const createStaffMutation = useMutation({
    mutationFn: (data: IStaffForm) => createStaffMutationFn(shop._id, data),
    onSuccess: () => {
      toast.success(t("dashboard.staffs.created"));
      queryClient.invalidateQueries({ queryKey: ["staffs", shop._id] });
      setIsOpen(false);
    },
  });

  const onSubmit = (data: IStaffForm) => {
    createStaffMutation.mutate(data);
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        <Button>
          <PlusCircle />{" "}
          <span className="hidden md:block">
            {t("dashboard.staffs.create")}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full  md:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>{t("dashboard.staffs.create")}</DrawerTitle>
          <DrawerDescription>
            {t("dashboard.staffs.create_description")}
          </DrawerDescription>
        </DrawerHeader>
        <StaffForm
          onSubmit={onSubmit}
          isLoading={createStaffMutation.isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
