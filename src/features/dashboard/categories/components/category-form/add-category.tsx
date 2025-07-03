import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useTranslation } from "react-i18next";
import { CategoryForm } from "./category-form";
import { createCategoryMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { ICategoryForm } from "../utils/category.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { PlusCircle } from "lucide-react";

export const AddCategory = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const createCategoryMutation = useMutation({
    mutationFn: (data: ICategoryForm) =>
      createCategoryMutationFn(data, shop._id),
    onSuccess: () => {
      toast.success(t("dashboard.categories.created"));
      queryClient.invalidateQueries({ queryKey: ["categories", shop._id] });
      setIsOpen(false);
    },
  });

  const onSubmit = (data: ICategoryForm) => {
    createCategoryMutation.mutate(data);
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        <Button>
          <PlusCircle />{" "}
          <span className="hidden md:block">
            {t("dashboard.categories.create")}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full  md:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>{t("dashboard.categories.create")}</DrawerTitle>
          <DrawerDescription>
            {t("dashboard.categories.create_description")}
          </DrawerDescription>
        </DrawerHeader>
        <CategoryForm
          onSubmit={onSubmit}
          isLoading={createCategoryMutation.isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
