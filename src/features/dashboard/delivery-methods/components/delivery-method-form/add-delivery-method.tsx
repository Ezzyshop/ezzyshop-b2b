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
import { DeliveryMethodForm } from "./delivery-method-form";
import { useShopContext } from "@/contexts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeliveryMethodMutationFn } from "@/api/mutations";
import { toast } from "sonner";
import { IDeliveryMethodForm } from "../../utils/delivery-methods.interface";

export const AddDeliveryMethod = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { shop } = useShopContext();
  const queryClient = useQueryClient();

  const createDeliveryMethodMutation = useMutation({
    mutationFn: (data: IDeliveryMethodForm) =>
      createDeliveryMethodMutationFn(shop._id, data),
    onSuccess: () => {
      toast.success(t("dashboard.delivery-methods.created"));
      queryClient.invalidateQueries({
        queryKey: ["delivery-methods", shop._id],
      });
      setIsOpen(false);
    },
  });

  const onSubmit = (data: IDeliveryMethodForm) => {
    createDeliveryMethodMutation.mutate(data);
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        <Button>
          <PlusCircle />{" "}
          <span className="hidden md:block">
            {t("dashboard.delivery-methods.create")}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full  md:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>{t("dashboard.delivery-methods.create")}</DrawerTitle>
          <DrawerDescription>
            {t("dashboard.delivery-methods.create_description")}
          </DrawerDescription>
        </DrawerHeader>
        <DeliveryMethodForm
          onSubmit={onSubmit}
          isLoading={createDeliveryMethodMutation.isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
