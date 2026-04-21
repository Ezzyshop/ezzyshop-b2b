import { Card, CardContent } from "@/components/ui/card";
import { IOrderResponse } from "../../utils/order.interface";
import { orderStatusTranslations } from "../../utils/order.enum";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

interface IProps {
  order: IOrderResponse;
}

export const OrderStatusHistory = ({ order }: IProps) => {
  const { t } = useTranslation();

  if (!order.status_history || order.status_history.length === 0) return null;

  return (
    <Card className="py-4 col-span-1 md:col-span-3">
      <CardContent className="space-y-4">
        <div className="font-medium">
          {t("dashboard.orders.status_history.title")}
        </div>
        <div className="flex flex-col gap-3">
          {order.status_history.map((entry, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-1 border-l-2 border-muted pl-4 text-sm"
            >
              <div className="flex items-center gap-2 font-medium">
                <span>{t(orderStatusTranslations[entry.from_status])}</span>
                <ArrowRight className="size-3 text-muted-foreground" />
                <span>{t(orderStatusTranslations[entry.to_status])}</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2">
                <span>{entry.changed_by.full_name}</span>
                <span>·</span>
                <span>
                  {new Date(entry.changed_at).toLocaleString()}
                </span>
              </div>
              {entry.comment && (
                <p className="text-muted-foreground italic">
                  "{entry.comment}"
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
