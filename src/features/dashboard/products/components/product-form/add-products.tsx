import { Button } from "@/components/ui/button";
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
import { ProductForm } from "./product-form";

export const AddProductButton = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  //   const { shop } = useShopContext();
  //   const queryClient = useQueryClient();

  //   const createCategoryMutation = useMutation({
  //     mutationFn: (data: ICategoryForm) =>
  //       createCategoryMutationFn(data, shop._id),
  //     onSuccess: () => {
  //       toast.success(t("dashboard.categories.created"));
  //       queryClient.invalidateQueries({ queryKey: ["categories", shop._id] });
  //       setIsOpen(false);
  //     },
  //   });

  // const onSubmit = (data: ICategoryForm) => {
  //   createCategoryMutation.mutate(data);
  // };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        <Button>
          <PlusCircle />{" "}
          <span className="hidden md:block">
            {t("dashboard.products.create")}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full  md:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>{t("dashboard.products.create")}</DrawerTitle>
          <DrawerDescription>
            {t("dashboard.products.create_description")}
          </DrawerDescription>
        </DrawerHeader>
        <ProductForm onSubmit={() => {}} isLoading={false} />
      </DrawerContent>
    </Drawer>
  );
};
