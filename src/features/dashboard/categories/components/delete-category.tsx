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
import { ICategory } from "../utils/category.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { toast } from "sonner";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IProps {
  category: ICategory;
}

export const DeleteCategory = ({ category }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteCategory, isPending } = useMutation({
    mutationFn: () => deleteCategoryMutationFn(shop._id, category._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(t("dashboard.categories.deleted"));
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
          <DialogTitle>{t("dashboard.categories.delete")}</DialogTitle>
          <DialogDescription>
            {t("dashboard.categories.delete_description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => deleteCategory()}
          >
            {t("dashboard.categories.delete")}
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
