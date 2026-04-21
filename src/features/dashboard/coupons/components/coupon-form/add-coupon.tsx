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
import { createCouponMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { ICreateCouponForm } from "../../utils/coupon.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { PlusCircle } from "lucide-react";

export const AddCoupon = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const createCouponMutation = useMutation({
    mutationFn: (data: ICreateCouponForm) => createCouponMutationFn(shop._id, data),
    onSuccess: () => {
      toast.success(t("dashboard.coupons.created"));
      queryClient.invalidateQueries({ queryKey: ["coupons", shop._id] });
      setIsOpen(false);
    },
  });

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        <Button>
          <PlusCircle />
          <span className="hidden md:block">{t("dashboard.coupons.create")}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full md:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>{t("dashboard.coupons.create")}</DrawerTitle>
          <DrawerDescription>{t("dashboard.coupons.create_description")}</DrawerDescription>
        </DrawerHeader>
        <CouponForm
          onSubmit={(data) => createCouponMutation.mutate(data)}
          isLoading={createCouponMutation.isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
