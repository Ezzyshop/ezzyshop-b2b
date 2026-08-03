import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useShopContext } from "@/contexts";
import { payCourierDebtMutationFn } from "@/api/mutations/debts.mutation";
import { ICourierDebtEntry } from "../../utils/debt.interface";

interface IProps {
  debt: ICourierDebtEntry;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PayDebtModal = ({ debt, open, onOpenChange }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState(String(debt.balance));

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      payCourierDebtMutationFn(shop._id, debt.courier._id, Number(amount)),
    onSuccess: () => {
      toast.success(t("dashboard.debts.paid_success"));
      queryClient.invalidateQueries({ queryKey: ["courier-debts", shop._id] });
      onOpenChange(false);
    },
  });

  const parsedAmount = Number(amount);
  const isValid =
    !isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= debt.balance;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("dashboard.debts.pay_title")}</DialogTitle>
          <DialogDescription>
            {t("dashboard.debts.pay_description", {
              name: debt.courier.full_name,
              balance: debt.balance.toLocaleString(),
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 py-2">
          <Label htmlFor="pay-amount">{t("dashboard.debts.amount")}</Label>
          <Input
            id="pay-amount"
            type="number"
            min={1}
            max={debt.balance}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {!isValid && amount !== "" && (
            <p className="text-xs text-destructive">
              {t("dashboard.debts.invalid_amount", {
                max: debt.balance.toLocaleString(),
              })}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("common.cancel")}
          </Button>
          <Button disabled={!isValid || isPending} onClick={() => mutate()}>
            {isPending ? t("common.loading") : t("dashboard.debts.confirm_pay")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
