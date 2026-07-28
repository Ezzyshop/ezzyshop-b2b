import { Card, CardContent } from "@/components/ui/card";
import { IOrderResponse } from "../../utils/order.interface";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

interface IProps {
  order: IOrderResponse;
}

export const OrderCourier = ({ order }: IProps) => {
  const { t } = useTranslation();

  return (
    <Card className="py-4">
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="font-medium">
            {t("dashboard.orders.courier_information.title")}
          </div>

          {!order.courier ? (
            <div className="text-sm text-muted-foreground">
              {t("dashboard.orders.courier_information.not_accepted")}
            </div>
          ) : (
            <>
              <div className="text-sm flex items-center justify-between gap-2">
                <p>{t("dashboard.orders.courier_information.name")}:</p>
                <p>{order.courier.full_name}</p>
              </div>
              {order.courier.phone && (
                <div className="text-sm flex items-center justify-between gap-2">
                  <p>{t("dashboard.orders.courier_information.phone")}:</p>
                  <p>{order.courier.phone}</p>
                </div>
              )}
              {order.accepted_at && (
                <div className="text-sm flex items-center justify-between gap-2">
                  <p>{t("dashboard.orders.courier_information.accepted_at")}:</p>
                  <p>{dayjs(order.accepted_at).format("DD.MM.YYYY HH:mm")}</p>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
