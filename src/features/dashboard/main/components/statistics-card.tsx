import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTotalAnalyticsQueryFn } from "@/api/queries/analytics.query";
import { useShopContext } from "@/contexts";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

export const StatisticsCard = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const { data, isLoading } = useQuery({
    queryKey: ["total-analytics", shop._id],
    queryFn: () => getTotalAnalyticsQueryFn(shop._id),
    enabled: !!shop?._id,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="h-[118px]">
            <CardHeader>
              <Skeleton className="h-4 w-24" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const getPercentage = (current: number, last: number) => {
    const percentage = ((current - last) / last) * 100;
    return percentage.toFixed(2);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <Card className="gap-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            {t("dashboard.main.total_revenue")}
          </CardTitle>
          <DollarSign className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.total_revenue.current_month.toLocaleString()}{" "}
            {shop.currency.symbol}
          </div>
          {data.total_revenue.last_month ? (
            <p className="text-xs text-green-600 mt-1">
              {getPercentage(
                data.total_revenue.current_month,
                data.total_revenue.last_month
              )}
              % {t("dashboard.main.from_last_month")}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card className="gap-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            {t("dashboard.main.new_customers")}
          </CardTitle>
          <Users className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.total_customers.current_month.toLocaleString()}{" "}
            {t("common.quantity_suffix")}
          </div>
          {data.total_customers.last_month ? (
            <p className="text-xs text-green-600 mt-1">
              {getPercentage(
                data.total_customers.current_month,
                data.total_customers.last_month
              )}
              % {t("dashboard.main.from_last_month")}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card className="gap-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            {t("dashboard.main.total_sales")}
          </CardTitle>
          <CreditCard className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.total_sales.current_month.toLocaleString()}{" "}
            {t("common.quantity_suffix")}
          </div>
          {data.total_sales.last_month ? (
            <p className="text-xs text-green-600 mt-1">
              {getPercentage(
                data.total_sales.current_month,
                data.total_sales.last_month
              )}
              % {t("dashboard.main.from_last_month")}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};
