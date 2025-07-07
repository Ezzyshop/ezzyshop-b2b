import { PaymentMethodStatus } from "./payment-method.enum";

import { PaymentMethodType } from "./payment-method.enum";

export interface IPaymentMethod {
  _id: string;
  shop: string;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  type: PaymentMethodType;
  click_config?: IClickPaymentMethodConfig;
  instructions: {
    uz: string | null;
    ru: string | null;
    en: string | null;
  };
  status: PaymentMethodStatus;
}

export interface IClickPaymentMethodConfig {
  merchant_id: string;
  service_id: string;
  merchant_user_id: string;
  secret_key: string;
}

export type TPaymentMethodForm = Pick<
  IPaymentMethod,
  "name" | "type" | "instructions" | "status"
>;

export type TClickPaymentMethodConfigForm = Pick<
  IClickPaymentMethodConfig,
  "merchant_id" | "service_id" | "merchant_user_id" | "secret_key"
>;
