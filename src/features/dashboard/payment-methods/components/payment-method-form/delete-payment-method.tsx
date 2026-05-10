import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { deletePaymentMethodMutationFn } from "@/api/mutations/payment-methods.mutation";
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
import { IPaymentMethod } from "../../utils/payment-methods.interface";
import {
  PaymentMethodType,
  paymentMethodTypeLabels,
} from "../../utils/payment-method.enum";

interface IProps {
  paymentMethod: IPaymentMethod;
}

export const DeletePaymentMethod = ({ paymentMethod }: IProps) => {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deletePaymentMethod, isPending } = useMutation({
    mutationFn: () =>
      deletePaymentMethodMutationFn(paymentMethod.shop, paymentMethod._id),
    onSuccess: () => {
      toast.success(t("dashboard.payment-methods.deleted"));
      queryClient.invalidateQueries({
        queryKey: ["payment-methods", paymentMethod.shop],
      });
      setIsOpen(false);
    },
  });

  const displayName =
    paymentMethod.name[i18n.language as keyof typeof paymentMethod.name] ||
    t(paymentMethodTypeLabels[paymentMethod.type as PaymentMethodType]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="size-8" size="icon" variant="outline">
          <Trash2Icon className="h-4 w-4 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("dashboard.payment-methods.delete")}</DialogTitle>
          <DialogDescription>
            {t("dashboard.payment-methods.delete_description", {
              name: displayName,
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => setIsOpen(false)}
          >
            {t("common.cancel")}
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => deletePaymentMethod()}
          >
            {t("dashboard.payment-methods.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
