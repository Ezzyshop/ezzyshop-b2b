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
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateOrderStatusMutationFn } from "@/api/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useShopContext } from "@/contexts";

interface IProps {
  order: IOrderResponse;
  autoOpenCancel?: boolean;
  onDialogClose?: () => void;
}

export const OrderStatusChanger = ({ order, autoOpenCancel, onDialogClose }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [comment, setComment] = useState("");

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  useEffect(() => {
    if (autoOpenCancel) {
      setStatus(OrderStatus.Cancelled);
    }
  }, [autoOpenCancel]);

  const isCancelling = status === OrderStatus.Cancelled;

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      updateOrderStatusMutationFn(shop._id, order._id, status, comment || undefined),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["order", shop._id, order._id],
      });
      toast.success(t("dashboard.orders.status_changer.success"));
      setComment("");
      onDialogClose?.();
    },
  });

  const handleClose = () => {
    setStatus(order.status);
    setComment("");
    onDialogClose?.();
  };

  const canSubmit = !isCancelling || comment.trim().length > 0;

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
          {orderStatuses.map((s) => (
            <SelectItem key={s} value={s}>
              {t(orderStatusTranslations[s])}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Dialog open={status !== order.status} onOpenChange={handleClose}>
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

          {isCancelling && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="cancel-reason">
                {t("dashboard.orders.status_changer.cancel_reason")}
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Textarea
                id="cancel-reason"
                rows={3}
                placeholder={t(
                  "dashboard.orders.status_changer.cancel_reason_placeholder"
                )}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              {t("dashboard.orders.status_changer.cancel")}
            </Button>
            <Button
              disabled={isPending || !canSubmit}
              onClick={() => mutate()}
            >
              {t("dashboard.orders.status_changer.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
