export enum PaymentMethodType {
  Click = "CLICK",
  Cash = "CASH",
  CardTransfer = "CARD_TRANSFER",
}

export enum PaymentMethodStatus {
  Active = "ACTIVE",
  Waiting = "WAITING",
  Inactive = "INACTIVE",
}

export const paymentMethodTypeLabels = {
  [PaymentMethodType.Click]: "dashboard.payment-methods.type_click",
  [PaymentMethodType.Cash]: "dashboard.payment-methods.type_cash",
  [PaymentMethodType.CardTransfer]:
    "dashboard.payment-methods.type_card_transfer",
};
