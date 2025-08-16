import { TransactionChequeImageStatus } from "@/features/dashboard/orders/utils/transaction.enum";
import { api } from "../axios";

export const updateTransactionChequeStatusMutationFn = (
  shopId: string,
  transactionId: string,
  chequeId: string,
  status: TransactionChequeImageStatus
) =>
  api.patch(`/transactions/${shopId}/${transactionId}/${chequeId}/status`, {
    status,
  });
