import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPaymentMethod } from "../utils/payment-methods.interface";
import { StatusChangeSwitch } from "@/components/moderator/forms/change-status-switch";
import {
  PaymentMethodStatus,
  PaymentMethodType,
  paymentMethodTypeLabels,
} from "../utils/payment-method.enum";
import { Badge } from "@/components/ui/badge/badge";
import { useTranslation } from "react-i18next";
import { PaymentMethodConfiguration } from "./payment-method-config-form/payment-method-configuration";
import { EditPaymentMethod } from "./payment-method-form/edit-payment-method";
// import { DeletePaymentMethod } from "./payment-method-form/delete-payment-method";

const TYPES_REQUIRING_CONFIG: PaymentMethodType[] = [
  PaymentMethodType.Click,
  PaymentMethodType.ClickTelegram,
  PaymentMethodType.Payme,
];

interface IProps {
  paymentMethod: IPaymentMethod;
}

export const PaymentMethodCard = ({ paymentMethod }: IProps) => {
  const { t, i18n } = useTranslation();
  const requiresConfig = TYPES_REQUIRING_CONFIG.includes(paymentMethod.type);

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{t(paymentMethodTypeLabels[paymentMethod.type])}</CardTitle>
        <div className="flex items-center gap-2">
          {paymentMethod.status === PaymentMethodStatus.Waiting ? (
            <>
              <Badge variant="destructive">
                {t("dashboard.payment-methods.waiting")}
              </Badge>
              <PaymentMethodConfiguration paymentMethod={paymentMethod} />
            </>
          ) : (
            <>
              <StatusChangeSwitch
                status={
                  paymentMethod.status === PaymentMethodStatus.Active
                    ? "ACTIVE"
                    : "INACTIVE"
                }
                url={`/payment-methods/${paymentMethod.shop}/${paymentMethod._id}/status`}
                invalidateQueryKey={["payment-methods"]}
              />
              {requiresConfig && (
                <PaymentMethodConfiguration paymentMethod={paymentMethod} />
              )}
            </>
          )}
          <EditPaymentMethod paymentMethod={paymentMethod} />
          {/* <DeletePaymentMethod paymentMethod={paymentMethod} /> */}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-bold">
          {
            paymentMethod.name[
              i18n.language as keyof typeof paymentMethod.instructions
            ]
          }
        </p>
        <p className="text-sm text-muted-foreground">
          {
            paymentMethod.instructions[
              i18n.language as keyof typeof paymentMethod.instructions
            ]
          }
        </p>
      </CardContent>
    </Card>
  );
};
