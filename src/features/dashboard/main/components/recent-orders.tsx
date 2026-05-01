import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useShopContext } from "@/contexts";
import { getOrdersQueryFn } from "@/api/queries/orders.query";
import { orderStatusTranslations } from "../../orders/utils/order.enum";

export const RecentOrders = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();

  const params = { limit: 8, sortBy: "createdAt", sortOrder: "desc" };

  const { data, isLoading } = useQuery({
    queryKey: ["orders", shop._id, params],
    queryFn: () => getOrdersQueryFn(shop._id, params),
    enabled: !!shop?._id,
  });

  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">
          {t("dashboard.main.recent_orders")}
        </CardTitle>
        <Button variant="ghost" size="sm" asChild className="gap-1 text-xs h-7">
          <Link to="/dashboard/order-management/orders">
            {t("dashboard.main.view_all")}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="space-y-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28 flex-1" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ) : !data?.data.length ? (
          <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
            {t("dashboard.main.no_orders")}
          </div>
        ) : (
          <div className="divide-y">
            {data.data.map((order) => (
              <Link
                key={order._id}
                to={`/dashboard/orders/${order._id}`}
                className="flex items-center gap-3 px-6 py-3 hover:bg-muted/40 transition-colors"
              >
                <span className="text-xs text-muted-foreground w-32 shrink-0">
                  {dayjs(order.createdAt).format("DD.MM.YYYY HH:mm")}
                </span>
                <span className="text-sm font-medium flex-1 min-w-0 truncate">
                  {order.customer_info.name}
                </span>
                <Badge status={order.status} className="shrink-0">
                  {t(orderStatusTranslations[order.status])}
                </Badge>
                <span className="text-sm font-semibold shrink-0 tabular-nums">
                  {order.total_price.toLocaleString()} {order.transaction.currency.symbol}
                </span>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
