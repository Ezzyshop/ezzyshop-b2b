import { getOrdersAnalyticsQueryFn } from "@/api/queries";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { OrderStatus, orderStatusTranslations } from "../../utils/order.enum";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Check, Clock, Package, Truck, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const orderStatusIcon: Record<OrderStatus, React.ReactNode> = {
  [OrderStatus.New]: <Package className="size-4" />,
  [OrderStatus.Processing]: <Clock className="size-4" />,
  [OrderStatus.Delivering]: <Truck className="size-4" />,
  [OrderStatus.Completed]: <Check className="size-4" />,
  [OrderStatus.Cancelled]: <X className="size-4" />,
};

export const OrderPageAnalytics = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const { data, isLoading } = useQuery({
    queryKey: ["analytics", shop._id],
    queryFn: () => getOrdersAnalyticsQueryFn(shop._id),
    enabled: Boolean(shop._id),
  });

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.values(OrderStatus).map((status) => (
          <Skeleton key={status} className="h-[122px] w-full" />
        ))}
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {Object.values(OrderStatus).map((status) => (
        <Card key={status}>
          <div className="px-4 md:px-6 flex justify-between items-center">
            <CardTitle>{t(orderStatusTranslations[status])}</CardTitle>
            <div className="flex items-center gap-2">
              {orderStatusIcon[status]}
            </div>
          </div>

          <CardContent>
            <h2 className="text-2xl font-bold">{data?.data[status]}</h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
