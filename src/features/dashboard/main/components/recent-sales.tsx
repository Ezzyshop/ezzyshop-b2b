import { getOrdersQueryFn } from "@/api/queries";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useShopContext } from "@/contexts";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const RecentSales = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();

  const params = {
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  };

  const { data, isLoading } = useQuery({
    queryKey: ["orders", shop._id],
    queryFn: () => getOrdersQueryFn(shop._id, params),
    enabled: !!shop?._id,
  });

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton className="h-[118px] w-full" />;
    }

    if (data?.data.length === 0) {
      return (
        <div className="text-center text-sm text-gray-500  flex items-center justify-center h-[286px]">
          {t("dashboard.main.no_sales")}
        </div>
      );
    }

    return data?.data.map((order) => (
      <Link
        to={`/dashboard/orders/${order._id}`}
        key={order._id}
        className="flex items-center"
      >
        <Avatar className="h-9 w-9 min-w-9">
          <AvatarFallback className="text-sm font-medium flex items-center justify-center w-full bg-background">
            {order.customer_info.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1 flex-1 min-w-0">
          <p className="text-sm font-medium leading-none">
            {order.customer_info.name}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {order.customer_info.phone}
          </p>
        </div>
        <div className="ml-auto font-medium text-sm">
          + {order.total_price.toLocaleString()}{" "}
          {order.transaction.currency.symbol}
        </div>
      </Link>
    ));
  };

  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>{t("dashboard.main.recent_sales")}</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <div className="space-y-6 h-full">{renderContent()}</div>
      </CardContent>
    </Card>
  );
};
