import { Button } from "@/components/ui/button/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  updateClickConfigMutationFn,
  updateClickTelegramConfigMutationFn,
  updatePaymeConfigMutationFn,
} from "@/api/mutations/payment-methods.mutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { PaymentMethodType } from "../../utils/payment-method.enum";
import {
  IClickConfig,
  IClickTelegramConfig,
  IPaymeConfig,
  IPaymentMethod,
} from "../../utils/payment-methods.interface";
import { ClickConfigForm } from "./click-config-form";
import { ClickTelegramConfigForm } from "./click-telegram-config-form";
import { PaymeConfigForm } from "./payme-config-form";

interface IProps {
  paymentMethod: IPaymentMethod;
}

export const PaymentMethodConfiguration = ({ paymentMethod }: IProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const onSuccess = () => {
    toast.success(t("dashboard.payment-methods.updated"));
    queryClient.invalidateQueries({
      queryKey: ["payment-methods", paymentMethod.shop],
    });
    setIsOpen(false);
  };

  const clickMutation = useMutation({
    mutationFn: (data: IClickConfig) =>
      updateClickConfigMutationFn(paymentMethod.shop, paymentMethod._id, data),
    onSuccess,
  });

  const clickTelegramMutation = useMutation({
    mutationFn: (data: IClickTelegramConfig) =>
      updateClickTelegramConfigMutationFn(
        paymentMethod.shop,
        paymentMethod._id,
        data
      ),
    onSuccess,
  });

  const paymeMutation = useMutation({
    mutationFn: (data: IPaymeConfig) =>
      updatePaymeConfigMutationFn(paymentMethod.shop, paymentMethod._id, data),
    onSuccess,
  });

  const renderForm = () => {
    switch (paymentMethod.type) {
      case PaymentMethodType.Click:
        return (
          <ClickConfigForm
            paymentMethodId={paymentMethod._id}
            initialValues={paymentMethod.click_config}
            onSubmit={(data) => clickMutation.mutate(data)}
            isLoading={clickMutation.isPending}
          />
        );
      case PaymentMethodType.ClickTelegram:
        return (
          <ClickTelegramConfigForm
            initialValues={paymentMethod.click_telegram_config}
            onSubmit={(data) => clickTelegramMutation.mutate(data)}
            isLoading={clickTelegramMutation.isPending}
          />
        );
      case PaymentMethodType.Payme:
        return (
          <PaymeConfigForm
            paymentMethodId={paymentMethod._id}
            initialValues={paymentMethod.payme_config}
            onSubmit={(data) => paymeMutation.mutate(data)}
            isLoading={paymeMutation.isPending}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        <Button className="size-8" size="icon" variant="outline">
          <Settings />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full md:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>
            {t("dashboard.payment-methods.config_title")}
          </DrawerTitle>
          <DrawerDescription>
            {t("dashboard.payment-methods.config_description")}
          </DrawerDescription>
        </DrawerHeader>
        {renderForm()}
      </DrawerContent>
    </Drawer>
  );
};
