import { Button } from "@/components/ui/button";
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
import { DeliveryMethodForm } from "./delivery-method-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDeliveryMethodMutationFn } from "@/api/mutations";
import { toast } from "sonner";
import { IDeliveryMethodForm } from "../../utils/delivery-methods.interface";
import { IDeliveryMethod } from "../../utils/delivery-methods.interface";

interface IProps {
  deliveryMethod: IDeliveryMethod;
}

export const EditDeliveryMethod = ({ deliveryMethod }: IProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const updateDeliveryMethodMutation = useMutation({
    mutationFn: (data: IDeliveryMethodForm) =>
      updateDeliveryMethodMutationFn(
        deliveryMethod.shop._id,
        deliveryMethod._id,
        data
      ),
    onSuccess: () => {
      toast.success(t("dashboard.delivery-methods.updated"));
      queryClient.invalidateQueries({
        queryKey: ["delivery-methods", deliveryMethod.shop._id],
      });
      setIsOpen(false);
    },
  });

  const onSubmit = (data: IDeliveryMethodForm) => {
    updateDeliveryMethodMutation.mutate(data);
  };

  const initialValues: IDeliveryMethodForm = useMemo(() => {
    return {
      name: deliveryMethod.name,
      price: deliveryMethod.price,
      estimated_days: deliveryMethod.estimated_days,
      pickup_location: deliveryMethod.pickup_location,
      deliveryType: deliveryMethod.deliveryType,
      initial_km: deliveryMethod.initial_km,
      initial_km_price: deliveryMethod.initial_km_price,
      every_km_price: deliveryMethod.every_km_price,
      min_order_price: deliveryMethod.min_order_price,
      type: deliveryMethod.type,
      estimated_day_prefix: deliveryMethod.estimated_day_prefix,
    };
  }, [deliveryMethod]);

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        <Button className="size-8" size="icon" variant="outline">
          <Edit />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full md:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>{t("dashboard.delivery-methods.create")}</DrawerTitle>
          <DrawerDescription>
            {t("dashboard.delivery-methods.create_description")}
          </DrawerDescription>
        </DrawerHeader>
        <DeliveryMethodForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          isLoading={updateDeliveryMethodMutation.isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
