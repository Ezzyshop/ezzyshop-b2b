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
import { useShopContext } from "@/contexts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TPaymentMethodForm } from "../../utils/payment-methods.interface";
import { createPaymentMethodMutationFn } from "@/api/mutations/payment-methods.mutation";
import { PaymentMethodForm } from "./payment-method-form";

export const AddPaymentMethod = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { shop } = useShopContext();
  const queryClient = useQueryClient();

  const createPaymentMethodMutation = useMutation({
    mutationFn: (data: TPaymentMethodForm) =>
      createPaymentMethodMutationFn(shop._id, data),
    onSuccess: () => {
      toast.success(t("dashboard.payment-methods.created"));
      queryClient.invalidateQueries({
        queryKey: ["payment-methods", shop._id],
      });
      setIsOpen(false);
    },
  });

  const onSubmit = (data: TPaymentMethodForm) => {
    createPaymentMethodMutation.mutate(data);
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        <Button>
          <PlusCircle />{" "}
          <span className="hidden md:block">
            {t("dashboard.payment-methods.create")}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full  md:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>{t("dashboard.payment-methods.create")}</DrawerTitle>
          <DrawerDescription>
            {t("dashboard.payment-methods.create_description")}
          </DrawerDescription>
        </DrawerHeader>
        <PaymentMethodForm
          onSubmit={onSubmit}
          isLoading={createPaymentMethodMutation.isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
