import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IOrderResponse } from "../../utils/order.interface";
import { useTranslation } from "react-i18next";

interface IProps {
  order: IOrderResponse;
}
export const OrderNote = ({ order }: IProps) => {
  const { t } = useTranslation();

  if (!order.notes) {
    return null;
  }

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle>{t("dashboard.orders.notes")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">{order.notes}</div>
      </CardContent>
    </Card>
  );
};
