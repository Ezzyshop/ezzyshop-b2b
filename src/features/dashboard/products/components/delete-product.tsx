import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { toast } from "sonner";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IProduct } from "../utils/product.interface";

interface IProps {
  product: IProduct;
}

export const DeleteProduct = ({ product }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteProduct, isPending } = useMutation({
    mutationFn: () => deleteProductMutationFn(shop._id, product._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(t("dashboard.products.deleted"));
      setIsOpen(false);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          disabled={isPending}
          className="cursor-pointer"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("dashboard.products.delete")}</DialogTitle>
          <DialogDescription>
            {t("dashboard.products.delete_description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => deleteProduct()}
          >
            {t("dashboard.products.delete")}
          </Button>

          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => setIsOpen(false)}
          >
            {t("common.cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
