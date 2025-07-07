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
import { PaymentMethodForm } from "./payment-method-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  IPaymentMethod,
  TPaymentMethodForm,
} from "../../utils/payment-methods.interface";
import { updatePaymentMethodMutationFn } from "@/api/mutations/payment-methods.mutation";

interface IProps {
  paymentMethod: IPaymentMethod;
}

export const EditPaymentMethod = ({ paymentMethod }: IProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const updatePaymentMethodMutation = useMutation({
    mutationFn: (data: TPaymentMethodForm) =>
      updatePaymentMethodMutationFn(
        paymentMethod.shop,
        paymentMethod._id,
        data
      ),
    onSuccess: () => {
      toast.success(t("dashboard.delivery-methods.updated"));
      queryClient.invalidateQueries({
        queryKey: ["delivery-methods", paymentMethod.shop],
      });
      setIsOpen(false);
    },
  });

  const onSubmit = (data: TPaymentMethodForm) => {
    updatePaymentMethodMutation.mutate(data);
  };

  const initialValues: TPaymentMethodForm = useMemo(() => {
    return {
      name: paymentMethod.name,
      type: paymentMethod.type,
      instructions: paymentMethod.instructions,
      status: paymentMethod.status,
    };
  }, [paymentMethod]);

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
        <PaymentMethodForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          isLoading={updatePaymentMethodMutation.isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
