import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPaymentMethod } from "../utils/payment-methods.interface";
import { StatusChangeSwitch } from "@/components/moderator/forms/change-status-switch";
import {
  PaymentMethodStatus,
  paymentMethodTypeLabels,
} from "../utils/payment-method.enum";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { ClickConfiguration } from "./payment-method-config-form/click-configuration";
import { EditPaymentMethod } from "./payment-method-form/edit-payment-method";

interface IProps {
  paymentMethod: IPaymentMethod;
}

export const PaymentMethodCard = ({ paymentMethod }: IProps) => {
  const { t, i18n } = useTranslation();
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{t(paymentMethodTypeLabels[paymentMethod.type])}</CardTitle>
        <div className="flex items-center gap-2">
          {paymentMethod.status !== PaymentMethodStatus.Waiting ? (
            <StatusChangeSwitch
              status={
                paymentMethod.status === PaymentMethodStatus.Active
                  ? "ACTIVE"
                  : "INACTIVE"
              }
              url={`/payment-methods/${paymentMethod.shop}/${paymentMethod._id}/status`}
              invalidateQueryKey={["payment-methods"]}
            />
          ) : (
            <>
              <Badge variant="destructive">
                {t("dashboard.payment-methods.waiting")}
              </Badge>
              <ClickConfiguration paymentMethod={paymentMethod} />
            </>
          )}
          <EditPaymentMethod paymentMethod={paymentMethod} />
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
