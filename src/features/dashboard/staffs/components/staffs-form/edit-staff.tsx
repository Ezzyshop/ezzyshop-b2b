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
import { updateStaffMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { IStaffForm } from "../../utils/staff.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { EditIcon } from "lucide-react";
import { IUser } from "@/lib";
import { StaffForm } from "./staff-form";
import { UserRoles } from "@/lib/enums";

interface IProps {
  staff: IUser;
}

export const EditStaff = ({ staff }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const updateStaffMutation = useMutation({
    mutationFn: (data: IStaffForm) =>
      updateStaffMutationFn(shop._id, staff._id, data),
    onSuccess: () => {
      toast.success(t("dashboard.staffs.updated"));
      queryClient.invalidateQueries({ queryKey: ["staffs", shop._id] });
      setIsOpen(false);
    },
  });

  const onSubmit = (data: IStaffForm) => {
    updateStaffMutation.mutate(data);
  };

  const shopRole = staff.shops
    ?.find((s) => s.shop._id === shop._id)
    ?.roles.find((r) => r === UserRoles.Admin || r === UserRoles.Staff);

  const initialValues: IStaffForm = {
    full_name: staff.full_name,
    phone: staff.phone!,
    photo: staff.photo!,
    role: (shopRole as UserRoles.Staff | UserRoles.Admin) ?? UserRoles.Staff,
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <EditIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full  md:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>{t("dashboard.staffs.edit")}</DrawerTitle>
          <DrawerDescription>
            {t("dashboard.staffs.edit_description")}
          </DrawerDescription>
        </DrawerHeader>
        <StaffForm
          onSubmit={onSubmit}
          isLoading={updateStaffMutation.isPending}
          initialValues={initialValues}
        />
      </DrawerContent>
    </Drawer>
  );
};
