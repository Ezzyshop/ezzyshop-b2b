export enum PaymentMethodType {
  Click = "CLICK",
  ClickTelegram = "CLICK_TELEGRAM",
  Payme = "PAYME",
  Cash = "CASH",
  CardTransfer = "CARD_TRANSFER",
}

export enum PaymentMethodStatus {
  Active = "ACTIVE",
  Waiting = "WAITING",
  Inactive = "INACTIVE",
}

export enum PaymentProviderMode {
  Test = "TEST",
  Production = "PRODUCTION",
}

export const paymentMethodTypeLabels = {
  [PaymentMethodType.Click]: "dashboard.payment-methods.type_click",
  [PaymentMethodType.ClickTelegram]: "dashboard.payment-methods.type_click_telegram",
  [PaymentMethodType.Payme]: "dashboard.payment-methods.type_payme",
  [PaymentMethodType.Cash]: "dashboard.payment-methods.type_cash",
  [PaymentMethodType.CardTransfer]: "dashboard.payment-methods.type_card_transfer",
};
