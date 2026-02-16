import {
  TransactionChequeImageStatus,
  TransactionStatus,
} from "@/features/dashboard/orders/utils/transaction.enum";
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

export const updateTransactionStatusMutationFn = (
  shopId: string,
  orderId: string,
  transactionId: string,
  status: TransactionStatus
) =>
  api.patch(`/transactions/${shopId}/orders/${orderId}/transactions/${transactionId}/status`, {
    status,
  });
