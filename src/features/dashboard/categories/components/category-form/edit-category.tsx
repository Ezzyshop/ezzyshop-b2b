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
import { updateCategoryMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { ICategory, ICategoryForm } from "../utils/category.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { EditIcon } from "lucide-react";

interface IProps {
  category: ICategory;
}

export const EditCategory = ({ category }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const updateCategoryMutation = useMutation({
    mutationFn: (data: ICategoryForm) =>
      updateCategoryMutationFn(category._id, data, shop._id),
    onSuccess: () => {
      toast.success(t("dashboard.categories.updated"));
      queryClient.invalidateQueries({ queryKey: ["categories", shop._id] });
      setIsOpen(false);
    },
  });

  const onSubmit = (data: ICategoryForm) => {
    updateCategoryMutation.mutate(data);
  };

  const initialValues: ICategoryForm = {
    name: {
      uz: category.name.uz,
      ru: category.name.ru,
      en: category.name.en,
    },
    image: category.image,
    is_popular: category.is_popular,
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <Button variant="outline" size="icon">
          <EditIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full  md:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>{t("dashboard.categories.edit")}</DrawerTitle>
          <DrawerDescription>
            {t("dashboard.categories.edit_description")}
          </DrawerDescription>
        </DrawerHeader>
        <CategoryForm
          onSubmit={onSubmit}
          isLoading={updateCategoryMutation.isPending}
          initialValues={initialValues}
        />
      </DrawerContent>
    </Drawer>
  );
};
