export enum TransactionStatus {
  Pending = "PENDING",
  Success = "SUCCESS",
  Refunded = "REFUNDED",
  Cancelled = "CANCELLED",
}

export enum TransactionChequeImageStatus {
  Pending = "PENDING",
  Verified = "VERIFIED",
  Rejected = "REJECTED",
}

export const transactionStatusTranslations = {
  [TransactionStatus.Pending]: "dashboard.orders.status.pending",
  [TransactionStatus.Success]: "dashboard.orders.status.success",
  [TransactionStatus.Refunded]: "dashboard.orders.status.refunded",
  [TransactionStatus.Cancelled]: "dashboard.orders.status.cancelled",
};
