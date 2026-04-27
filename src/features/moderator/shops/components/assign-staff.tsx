import { Button } from "@/components/ui/button/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { createStaffMutationFn } from "@/api/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { IStaffForm } from "@/features/dashboard/staffs/utils/staff.interface";
import { StaffForm } from "@/features/dashboard/staffs/components/staffs-form/staff-form";

interface IProps {
  shopId: string;
}

export const AssignStaff = ({ shopId }: IProps) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const assignStaffMutation = useMutation({
    mutationFn: (data: IStaffForm) => createStaffMutationFn(shopId, data),
    onSuccess: () => {
      toast.success("Xodim muvaffaqiyatli biriktirildi");
      queryClient.invalidateQueries({ queryKey: ["staffs", shopId] });
      setIsOpen(false);
    },
  });

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" title="Xodim biriktirish">
          <UserPlus className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full md:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>Xodim biriktirish</DrawerTitle>
          <DrawerDescription>
            Telefon raqamni kiriting — tizim foydalanuvchini topadi yoki yangi
            yaratadi
          </DrawerDescription>
        </DrawerHeader>
        <StaffForm
          onSubmit={(data) => assignStaffMutation.mutate(data)}
          isLoading={assignStaffMutation.isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
