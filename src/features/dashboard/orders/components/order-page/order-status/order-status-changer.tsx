import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IOrderResponse } from "../../../utils/order.interface";
import {
  OrderStatus,
  orderStatusTranslations,
} from "../../../utils/order.enum";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { updateOrderStatusMutationFn } from "@/api/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useShopContext } from "@/contexts";

interface IProps {
  order: IOrderResponse;
}

export const OrderStatusChanger = ({ order }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const { mutate, isPending } = useMutation({
    mutationFn: (status: OrderStatus) =>
      updateOrderStatusMutationFn(shop._id, order._id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["order", shop._id, order._id],
      });
      toast.success(t("dashboard.orders.status_changer.success"));
    },
  });

  const orderStatuses = Object.values(OrderStatus).filter(
    (_, idx) =>
      idx >= Object.values(OrderStatus).findIndex((s) => s === order.status)
  );

  return (
    <>
      <Select
        value={status}
        onValueChange={(value) => setStatus(value as OrderStatus)}
      >
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {orderStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              {t(orderStatusTranslations[status])}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Dialog
        open={status !== order.status}
        onOpenChange={() => setStatus(order.status)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("dashboard.orders.status_changer.title")}
            </DialogTitle>
            <DialogDescription>
              {t("dashboard.orders.status_changer.description", {
                status: t(orderStatusTranslations[status]),
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatus(order.status)}>
              {t("dashboard.orders.status_changer.cancel")}
            </Button>
            <Button disabled={isPending} onClick={() => mutate(status)}>
              {t("dashboard.orders.status_changer.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
