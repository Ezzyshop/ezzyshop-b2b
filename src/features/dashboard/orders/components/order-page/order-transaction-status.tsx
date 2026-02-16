import { useTranslation } from "react-i18next";
import { IOrderResponse } from "../../utils/order.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TransactionStatus,
  transactionStatusTranslations,
} from "../../utils/transaction.enum";
import { updateTransactionStatusMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IProps {
  order: IOrderResponse;
}

export const OrderTransactionStatus = ({ order }: IProps) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (status: TransactionStatus) =>
      updateTransactionStatusMutationFn(
        shop._id,
        order._id,
        order.transaction._id,
        status
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order", shop._id, order._id],
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.orders.transaction_status")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Select
          disabled={isPending}
          value={order.transaction.status}
          onValueChange={(value) => mutate(value as TransactionStatus)}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={t("dashboard.orders.transaction_status")}
            />
          </SelectTrigger>
          <SelectContent>
            {Object.values(TransactionStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {t(transactionStatusTranslations[status])}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};
