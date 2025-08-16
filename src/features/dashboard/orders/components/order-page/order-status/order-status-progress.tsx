import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Check, Clock, Package, Truck, X } from "lucide-react";
import {
  OrderStatus,
  orderStatusTranslations,
} from "../../../utils/order.enum";
import { IOrderResponse } from "../../../utils/order.interface";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib";
import { OrderStatusChanger } from "./order-status-changer";

interface IProps {
  order: IOrderResponse;
}

const orderStatusIcon: Record<OrderStatus, React.ReactNode> = {
  [OrderStatus.New]: <Package className="size-4" />,
  [OrderStatus.Processing]: <Clock className="size-4" />,
  [OrderStatus.Delivering]: <Truck className="size-4" />,
  [OrderStatus.Completed]: <Check className="size-4" />,
  [OrderStatus.Cancelled]: <X className="size-4" />,
};

export const OrderStatusProgress = ({ order }: IProps) => {
  const { t } = useTranslation();
  const currentIndex =
    Object.values(OrderStatus).findIndex((s) => s === order.status) ?? 0;

  const progressValue =
    (currentIndex / (Object.values(OrderStatus).length - 1)) * 100;

  const isAbleToChangeStatus =
    order.status === OrderStatus.New ||
    order.status === OrderStatus.Processing ||
    order.status === OrderStatus.Delivering;

  return (
    <Card>
      <div className="flex justify-between items-center gap-4 w-full px-4 md:px-6">
        <CardTitle>{t("dashboard.orders.status_information")}</CardTitle>
        {isAbleToChangeStatus && <OrderStatusChanger order={order} />}
      </div>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          {Object.values(OrderStatus).map((s, idx) => {
            const reached = idx <= currentIndex;
            return (
              <div key={s} className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "size-9 rounded-full border flex items-center justify-center",
                    s === OrderStatus.Cancelled &&
                      reached &&
                      "bg-destructive text-white border-destructive",
                    reached
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted"
                  )}
                >
                  {orderStatusIcon[s]}
                </div>
                <div className="text-xs text-center line-clamp-1">
                  {t(orderStatusTranslations[s])}
                </div>
              </div>
            );
          })}
        </div>
        <Progress value={progressValue - 1} />
      </CardContent>
    </Card>
  );
};
