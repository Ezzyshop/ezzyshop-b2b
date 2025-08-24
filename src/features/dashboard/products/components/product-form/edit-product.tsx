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
import { ProductForm } from "./product-form";
import { useShopContext } from "@/contexts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IProduct, IProductForm } from "../../utils/product.interface";
import { editProductMutationFn } from "@/api/mutations";

interface IProps {
  product: IProduct;
}

export const EditProductButton = ({ product }: IProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { shop } = useShopContext();
  const queryClient = useQueryClient();

  const editProductMutation = useMutation({
    mutationFn: (data: IProductForm) =>
      editProductMutationFn(data, shop._id, product._id),
    onSuccess: () => {
      toast.success(t("dashboard.products.edited"));
      queryClient.invalidateQueries({ queryKey: ["products", shop._id] });
      setIsOpen(false);
    },
  });

  const onSubmit = (data: IProductForm) => {
    editProductMutation.mutate(data);
  };

  const initialValues: IProductForm = useMemo(() => {
    if (!product) return {} as IProductForm;

    return {
      name: product.name,
      description: product.description || {
        uz: "",
        en: "",
        ru: "",
      },
      price: product.price,
      compare_at_price: product.compare_at_price,
      images: product.images,
      categories: product.categories,
      variants: product.variants,
      status: product.status,
      delivery_time: product.delivery_time,
    };
  }, [product]);

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        <Button variant="outline" size="icon">
          <Edit />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full  md:max-w-3xl">
        <DrawerHeader>
          <DrawerTitle>{t("dashboard.products.edit")}</DrawerTitle>
          <DrawerDescription>
            {t("dashboard.products.edit_description")}
          </DrawerDescription>
        </DrawerHeader>
        <ProductForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          isLoading={editProductMutation.isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
