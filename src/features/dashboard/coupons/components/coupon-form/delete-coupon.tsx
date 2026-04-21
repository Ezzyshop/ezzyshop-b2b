import { Button } from "@/components/ui/button/button";
import { useTranslation } from "react-i18next";
import { deleteCouponMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { ICoupon } from "../../utils/coupon.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2Icon } from "lucide-react";

interface IProps {
  coupon: ICoupon;
}

export const DeleteCoupon = ({ coupon }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();

  const deleteCouponMutation = useMutation({
    mutationFn: () => deleteCouponMutationFn(shop._id, coupon._id),
    onSuccess: () => {
      toast.success(t("dashboard.coupons.deleted"));
      queryClient.invalidateQueries({ queryKey: ["coupons", shop._id] });
    },
  });

  return (
    <Button
      variant="outline"
      size="icon"
      disabled={deleteCouponMutation.isPending}
      onClick={() => deleteCouponMutation.mutate()}
    >
      <Trash2Icon className="h-4 w-4 text-red-500" />
    </Button>
  );
};
