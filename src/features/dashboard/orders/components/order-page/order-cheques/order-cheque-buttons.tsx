import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckIcon, XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { IOrderResponse } from "../../../utils/order.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransactionChequeStatusMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { TransactionChequeImageStatus } from "../../../utils/transaction.enum";
import { toast } from "sonner";
import { useState } from "react";
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
  const [rejectReason, setRejectReason] = useState("");
  const [rejectOpen, setRejectOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      status,
      reason,
    }: {
      status: TransactionChequeImageStatus;
      reason?: string;
    }) =>
      updateTransactionChequeStatusMutationFn(
        shop._id,
        order.transaction._id,
        chequeId,
        status,
        reason,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order", shop._id, order._id],
      });
      toast.success(t("dashboard.orders.cheque_image_actions.changed"));
      setRejectReason("");
      setRejectOpen(false);
    },
  });

  return (
    <div className="grid grid-cols-2 gap-2 mt-1">
      {/* Verify */}
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
            <DialogDescription>
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
              disabled={isPending}
              onClick={() =>
                mutate({ status: TransactionChequeImageStatus.Verified })
              }
            >
              {t("dashboard.orders.cheque_image_actions.verify")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject */}
      <Dialog open={rejectOpen} onOpenChange={(o) => { setRejectOpen(o); if (!o) setRejectReason(""); }}>
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
            <DialogDescription>
              {t("dashboard.orders.cheque_image_actions.reject_description")}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="reject-reason">
              {t("dashboard.orders.cheque_image_actions.reject_reason")}
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Textarea
              id="reject-reason"
              rows={3}
              placeholder={t(
                "dashboard.orders.cheque_image_actions.reject_reason_placeholder",
              )}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setRejectOpen(false); setRejectReason(""); }}
            >
              {t("dashboard.orders.cheque_image_actions.close")}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              disabled={isPending || rejectReason.trim().length === 0}
              onClick={() =>
                mutate({
                  status: TransactionChequeImageStatus.Rejected,
                  reason: rejectReason,
                })
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
