import { Card, CardContent } from "@/components/ui/card";
import { IOrderResponse } from "../../../utils/order.interface";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PaymentMethodType } from "@/features/dashboard/payment-methods/utils/payment-method.enum";
import { Badge } from "@/components/ui/badge";
import {
  TransactionChequeImageStatus,
  transactionChequeImageStatusTranslations,
} from "../../../utils/transaction.enum";
import dayjs from "dayjs";
import { OrderChequeButtons } from "./order-cheque-buttons";
import { Image } from "@/components/ui/image";

interface IProps {
  order: IOrderResponse;
}

export const OrderCheques = ({ order }: IProps) => {
  const { t } = useTranslation();

  const isPaymentProviderCardTransfer =
    order.transaction.provider === PaymentMethodType.CardTransfer;

  if (!isPaymentProviderCardTransfer) {
    return null;
  }

  const renderChequeImages = () => {
    if (order.transaction.cheque_images.length === 0) {
      return (
        <div className="text-sm text-muted-foreground">
          {t("dashboard.orders.cheques_empty")}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {order.transaction.cheque_images.map((cheque) => (
          <div key={cheque.url} className="flex items-start gap-4">
            <Image
              src={cheque.url}
              alt={cheque.url}
              className="w-[64px] h-[64px] min-w-[64px] min-h-[64px] aspect-square rounded-lg object-cover"
            />
            <div className="flex-grow">
              <p>{t("dashboard.orders.cheque_date")}</p>
              <p>{dayjs(cheque.createdAt).format("DD.MM.YYYY HH:mm")}</p>
              {cheque.status === TransactionChequeImageStatus.Pending && (
                <OrderChequeButtons order={order} chequeId={cheque._id} />
              )}
            </div>
            {cheque.status !== TransactionChequeImageStatus.Pending && (
              <Badge variant="outline" status={cheque.status}>
                {t(transactionChequeImageStatusTranslations[cheque.status])}
              </Badge>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="p-0">
      <CardContent>
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">
              {t("dashboard.orders.cheques")}
            </AccordionTrigger>
            <AccordionContent>{renderChequeImages()}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
