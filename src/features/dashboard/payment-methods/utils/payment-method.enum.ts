export enum PaymentMethodType {
  Click = "CLICK",
  Cash = "CASH",
}

export enum PaymentMethodStatus {
  Active = "ACTIVE",
  Waiting = "WAITING",
  Inactive = "INACTIVE",
}

export const paymentMethodTypeLabels = {
  [PaymentMethodType.Click]: "dashboard.payment-methods.type_click",
  [PaymentMethodType.Cash]: "dashboard.payment-methods.type_cash",
};
