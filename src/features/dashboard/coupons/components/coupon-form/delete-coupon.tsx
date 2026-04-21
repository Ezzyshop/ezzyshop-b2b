import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { deleteCouponMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { ICoupon } from "../../utils/coupon.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IProps {
  coupon: ICoupon;
}

export const DeleteCoupon = ({ coupon }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteCoupon, isPending } = useMutation({
    mutationFn: () => deleteCouponMutationFn(shop._id, coupon._id),
    onSuccess: () => {
      toast.success(t("dashboard.coupons.deleted"));
      queryClient.invalidateQueries({ queryKey: ["coupons", shop._id] });
      setIsOpen(false);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash2Icon className="h-4 w-4 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("dashboard.coupons.delete")}</DialogTitle>
          <DialogDescription>
            {t("dashboard.coupons.delete_description", { code: coupon.code })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" disabled={isPending} onClick={() => setIsOpen(false)}>
            {t("common.cancel")}
          </Button>
          <Button variant="destructive" disabled={isPending} onClick={() => deleteCoupon()}>
            {t("dashboard.coupons.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
