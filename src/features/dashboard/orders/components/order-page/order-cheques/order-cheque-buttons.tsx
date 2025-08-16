import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { IOrderResponse } from "../../../utils/order.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransactionChequeStatusMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { TransactionChequeImageStatus } from "../../../utils/transaction.enum";
import { toast } from "sonner";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface IProps {
  order: IOrderResponse;
  chequeId: string;
}

export const OrderChequeButtons = ({ order, chequeId }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (status: TransactionChequeImageStatus) => {
      return updateTransactionChequeStatusMutationFn(
        shop._id,
        order.transaction._id,
        chequeId,
        status
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order", shop._id, order._id],
      });
      toast.success(t("dashboard.orders.cheque_image_actions.changed"));
    },
  });

  return (
    <div className="grid grid-cols-2 gap-2 mt-1">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full" size="sm">
            <CheckIcon className="w-4 h-4" />
            {t("dashboard.orders.cheque_image_actions.verify")}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("dashboard.orders.cheque_image_actions.verify")}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {t("dashboard.orders.cheque_image_actions.verify_description")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size="sm">
                {t("dashboard.orders.cheque_image_actions.close")}
              </Button>
            </DialogClose>
            <Button
              size="sm"
              disabled={mutate.isPending}
              onClick={() =>
                mutate.mutate(TransactionChequeImageStatus.Verified)
              }
            >
              {t("dashboard.orders.cheque_image_actions.verify")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full" variant="destructive" size="sm">
            <XIcon className="w-4 h-4" />
            {t("dashboard.orders.cheque_image_actions.reject")}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("dashboard.orders.cheque_image_actions.reject")}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {t("dashboard.orders.cheque_image_actions.reject_description")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size="sm">
                {t("dashboard.orders.cheque_image_actions.close")}
              </Button>
            </DialogClose>
            <Button
              size="sm"
              variant="destructive"
              disabled={mutate.isPending}
              onClick={() =>
                mutate.mutate(TransactionChequeImageStatus.Rejected)
              }
            >
              {t("dashboard.orders.cheque_image_actions.reject")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
