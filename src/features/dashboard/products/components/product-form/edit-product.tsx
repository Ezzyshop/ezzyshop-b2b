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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IProductForm } from "../../utils/product.interface";
import { editProductMutationFn } from "@/api/mutations";
import { getProductQueryFn } from "@/api/queries";

interface IProps {
  productId: string;
}

export const EditProductButton = ({ productId }: IProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductQueryFn(shop._id, productId),
  });

  const editProductMutation = useMutation({
    mutationFn: (data: IProductForm) =>
      editProductMutationFn(data, shop._id, productId),
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
    if (!data?.data) return {} as IProductForm;

    return {
      name: data.data.name,
      description: data.data.description || {
        uz: "",
        en: "",
        ru: "",
      },
      price: data.data.price,
      compare_at_price: data.data.compare_at_price,
      images: data.data.images,
      categories: data.data.categories,
      variants: data.data.variants,
      status: data.data.status,
    };
  }, [data?.data]);

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        <Button variant="outline" size="icon">
          <Edit />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full  md:max-w-lg">
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
