import { Card, CardContent } from "@/components/ui/card";
import { IOrderResponse } from "../../utils/order.interface";
import { useTranslation } from "react-i18next";

interface IProps {
  order: IOrderResponse;
}

export const OrderCustomer = ({ order }: IProps) => {
  const { t } = useTranslation();
  return (
    <Card className="py-4">
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="font-medium">
            {t("dashboard.orders.customer_information.title")}
          </div>
          <div className="text-sm flex items-center justify-between gap-2">
            <p>{t("dashboard.orders.customer_information.name")}:</p>
            <p>{order.customer_info.name}</p>
          </div>
          <div className="text-sm flex items-center justify-between gap-2">
            <p>{t("dashboard.orders.customer_information.phone")}:</p>
            <p>{order.customer_info.phone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
