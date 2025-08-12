import { Button } from "@/components/ui/button/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useShopContext } from "@/contexts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBranchMutationFn } from "@/api/mutations";
import { toast } from "sonner";
import { IBranchForm } from "../../utils/branches.interface";
import { BranchForm } from "./branch-form";
import { removeEmptyStringFields } from "@/lib/remove-empty-fields";

export const AddBranch = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { shop } = useShopContext();
  const queryClient = useQueryClient();

  const createBranchMutation = useMutation({
    mutationFn: (data: IBranchForm) => createBranchMutationFn(shop._id, data),
    onSuccess: () => {
      toast.success(t("dashboard.branches.created"));
      queryClient.invalidateQueries({
        queryKey: ["branches", shop._id],
      });
      setIsOpen(false);
    },
  });

  const onSubmit = (data: IBranchForm) => {
    removeEmptyStringFields(data);
    createBranchMutation.mutate(data);
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        <Button>
          <PlusCircle />{" "}
          <span className="hidden md:block">
            {t("dashboard.branches.create")}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full  md:max-w-2xl">
        <DrawerHeader>
          <DrawerTitle>{t("dashboard.branches.create")}</DrawerTitle>
          <DrawerDescription>
            {t("dashboard.branches.create_description")}
          </DrawerDescription>
        </DrawerHeader>
        <BranchForm
          onSubmit={onSubmit}
          isLoading={createBranchMutation.isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
