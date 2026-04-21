import { Button } from "@/components/ui/button/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useTranslation } from "react-i18next";
import { CouponForm } from "./coupon-form";
import { updateCouponMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { ICoupon, ICreateCouponForm } from "../../utils/coupon.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { PencilIcon } from "lucide-react";

interface IProps {
  coupon: ICoupon;
}

export const EditCoupon = ({ coupon }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const updateCouponMutation = useMutation({
    mutationFn: (data: Partial<ICreateCouponForm>) =>
      updateCouponMutationFn(shop._id, coupon._id, data),
    onSuccess: () => {
      toast.success(t("dashboard.coupons.updated"));
      queryClient.invalidateQueries({ queryKey: ["coupons", shop._id] });
      setIsOpen(false);
    },
  });

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <PencilIcon className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full md:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>{t("common.edit")}</DrawerTitle>
          <DrawerDescription>{coupon.code}</DrawerDescription>
        </DrawerHeader>
        <CouponForm
          onSubmit={(data) => updateCouponMutation.mutate(data)}
          isLoading={updateCouponMutation.isPending}
          defaultValues={{
            discount_type: coupon.discount_type,
            discount_value: coupon.discount_value,
            min_order_price: coupon.min_order_price,
            max_uses: coupon.max_uses,
            max_uses_per_user: coupon.max_uses_per_user,
            expires_at: coupon.expires_at,
            allowed_users: coupon.allowed_users ?? [],
          }}
          hideCode
        />
      </DrawerContent>
    </Drawer>
  );
};
