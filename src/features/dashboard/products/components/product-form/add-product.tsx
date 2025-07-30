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
import { ProductForm } from "./product-form";
import { useShopContext } from "@/contexts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductMutationFn } from "@/api/mutations";
import { toast } from "sonner";
import { IProductForm } from "../../utils/product.interface";

export const AddProductButton = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { shop } = useShopContext();
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: (data: IProductForm) => createProductMutationFn(data, shop._id),
    onSuccess: () => {
      toast.success(t("dashboard.products.created"));
      queryClient.invalidateQueries({ queryKey: ["products", shop._id] });
      setIsOpen(false);
    },
  });

  const onSubmit = (data: IProductForm) => {
    createProductMutation.mutate(data);
  };

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
      <DrawerContent className="w-full  md:max-w-3xl">
        <DrawerHeader>
          <DrawerTitle>{t("dashboard.products.create")}</DrawerTitle>
          <DrawerDescription>
            {t("dashboard.products.create_description")}
          </DrawerDescription>
        </DrawerHeader>
        <ProductForm
          onSubmit={onSubmit}
          isLoading={createProductMutation.isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
