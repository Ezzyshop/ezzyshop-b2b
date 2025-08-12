import { Button } from "@/components/ui/button/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Edit } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBranchMutationFn } from "@/api/mutations";
import { IBranchForm } from "../../utils/branches.interface";
import { IBranch } from "../../utils/branches.interface";
import { toast } from "sonner";
import { BranchForm } from "./branch-form";

interface IProps {
  branch: IBranch;
}

export const EditBranch = ({ branch }: IProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const updateBranchMutation = useMutation({
    mutationFn: (data: IBranchForm) =>
      updateBranchMutationFn(branch.shop._id, branch._id, data),
    onSuccess: () => {
      toast.success(t("dashboard.delivery-methods.updated"));
      queryClient.invalidateQueries({
        queryKey: ["branches", branch.shop._id],
      });
      setIsOpen(false);
    },
  });

  const onSubmit = (data: IBranchForm) => {
    updateBranchMutation.mutate(data);
  };

  const initialValues: IBranchForm = useMemo(() => {
    return {
      name: branch.name,
      address: branch.address,
      pickup_enabled: branch.pickup_enabled,
      delivery_enabled: branch.delivery_enabled,
      service_radius_km: branch.service_radius_km,
      image: branch.image,
      notes: branch.notes,
      working_hours: branch.working_hours,
    };
  }, [branch]);

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        <Button className="size-8" size="icon" variant="outline">
          <Edit />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full md:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>{t("dashboard.branches.edit")}</DrawerTitle>
          <DrawerDescription>
            {t("dashboard.branches.edit_description")}
          </DrawerDescription>
        </DrawerHeader>
        <BranchForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          isLoading={updateBranchMutation.isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
