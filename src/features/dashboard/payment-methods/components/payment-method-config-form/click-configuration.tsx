import { Button } from "@/components/ui/button/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Settings } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  IPaymentMethod,
  TClickPaymentMethodConfigForm,
} from "../../utils/payment-methods.interface";
import { updateClickPaymentMethodConfigMutationFn } from "@/api/mutations/payment-methods.mutation";
import { PaymentMethodConfigForm } from "./payment-method-config-form";

interface IProps {
  paymentMethod: IPaymentMethod;
}

export const ClickConfiguration = ({ paymentMethod }: IProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const updatePaymentMethodMutation = useMutation({
    mutationFn: (data: TClickPaymentMethodConfigForm) =>
      updateClickPaymentMethodConfigMutationFn(
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

  const onSubmit = (data: TClickPaymentMethodConfigForm) => {
    updatePaymentMethodMutation.mutate(data);
  };

  const initialValues: TClickPaymentMethodConfigForm = useMemo(() => {
    if (!paymentMethod.click_config) {
      return {
        merchant_id: "",
        service_id: "",
        merchant_user_id: "",
        secret_key: "",
      };
    }

    return {
      merchant_id: paymentMethod.click_config.merchant_id,
      service_id: paymentMethod.click_config.service_id,
      merchant_user_id: paymentMethod.click_config.merchant_user_id,
      secret_key: paymentMethod.click_config.secret_key,
    };
  }, [paymentMethod]);

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        <Button className="size-8" size="icon" variant="outline">
          <Settings />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full md:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>{t("dashboard.delivery-methods.create")}</DrawerTitle>
          <DrawerDescription>
            {t("dashboard.delivery-methods.create_description")}
          </DrawerDescription>
        </DrawerHeader>
        <PaymentMethodConfigForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          isLoading={updatePaymentMethodMutation.isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
