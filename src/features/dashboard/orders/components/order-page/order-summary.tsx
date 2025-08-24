import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IOrderResponse } from "../../utils/order.interface";
import { useTranslation } from "react-i18next";
import { paymentMethodTypeLabels } from "@/features/dashboard/payment-methods/utils/payment-method.enum";
import { transactionStatusTranslations } from "../../utils/transaction.enum";
import { Badge } from "@/components/ui/badge";

interface IProps {
  order: IOrderResponse;
}

export const OrderSummary = ({ order }: IProps) => {
  const { t } = useTranslation();
  const currency = order.transaction.currency.symbol;
  const shipping = order.delivery_method?.price ?? 0;
  const discountPrice = order.total_discount;
  const subtotal = order.total_price - shipping + discountPrice;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.orders.summary.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span>{t("dashboard.orders.summary.payment_method")}</span>
          <span>
            {t(paymentMethodTypeLabels[order.transaction.provider.type])}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>{t("dashboard.orders.summary.payment_status")}</span>
          <Badge status={order.transaction.status}>
            {t(transactionStatusTranslations[order.transaction.status])}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span>{t("dashboard.orders.summary.subtotal")}</span>
          <span>
            {subtotal.toLocaleString()} {currency}
          </span>
        </div>
        {discountPrice && (
          <div className="flex items-center justify-between text-sm">
            <span>{t("dashboard.orders.summary.discount")}</span>
            <span className="text-destructive">
              -{discountPrice.toLocaleString()} {currency}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span>{t("dashboard.orders.summary.shipping")}</span>
          <span>
            {shipping.toLocaleString()} {currency}
          </span>
        </div>
        <div className="border-t pt-3 flex items-center justify-between font-semibold">
          <span>{t("dashboard.orders.summary.total")}</span>
          <span>
            {order.total_price.toLocaleString()} {currency}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
