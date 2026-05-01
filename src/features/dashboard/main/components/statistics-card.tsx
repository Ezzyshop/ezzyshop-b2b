import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, ShoppingBag, TrendingDown, TrendingUp, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTotalAnalyticsQueryFn } from "@/api/queries/analytics.query";
import { getOrdersQueryFn } from "@/api/queries/orders.query";
import { useShopContext } from "@/contexts";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

const getTodayRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).toISOString();
  const yesterdayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toISOString();
  const yesterdayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59, 999).toISOString();
  return { start, end, yesterdayStart, yesterdayEnd };
};

export const StatisticsCard = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const { start, end, yesterdayStart, yesterdayEnd } = getTodayRange();

  const { data, isLoading } = useQuery({
    queryKey: ["total-analytics", shop._id],
    queryFn: () => getTotalAnalyticsQueryFn(shop._id),
    enabled: !!shop?._id,
  });

  const todayParams = { limit: 1, "createdAt[gte]": start, "createdAt[lte]": end };
  const yesterdayParams = { limit: 1, "createdAt[gte]": yesterdayStart, "createdAt[lte]": yesterdayEnd };

  const { data: todayOrders, isLoading: todayLoading } = useQuery({
    queryKey: ["orders", shop._id, todayParams],
    queryFn: () => getOrdersQueryFn(shop._id, todayParams),
    enabled: !!shop?._id,
  });

  const { data: yesterdayOrders } = useQuery({
    queryKey: ["orders", shop._id, yesterdayParams],
    queryFn: () => getOrdersQueryFn(shop._id, yesterdayParams),
    enabled: !!shop?._id,
  });

  if (isLoading || todayLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="h-[118px]">
            <CardHeader>
              <Skeleton className="h-4 w-24" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (!data) return null;

  const getPercentage = (current: number, last: number) => {
    if (!last) return null;
    return ((current - last) / last) * 100;
  };

  const todayCount = todayOrders?.paginationInfo?.totalItems ?? 0;
  const yesterdayCount = yesterdayOrders?.paginationInfo?.totalItems ?? 0;
  const todayDiff = getPercentage(todayCount, yesterdayCount);

  const Trend = ({ pct }: { pct: number | null }) => {
    if (pct === null) return null;
    const isUp = pct >= 0;
    return (
      <p className={`text-xs mt-1 flex items-center gap-1 ${isUp ? "text-green-600" : "text-red-500"}`}>
        {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        {Math.abs(pct).toFixed(1)}% {t("dashboard.main.from_last_month")}
      </p>
    );
  };

  const monthRevPct = getPercentage(data.total_revenue.current_month, data.total_revenue.last_month);
  const monthCustPct = getPercentage(data.total_customers.current_month, data.total_customers.last_month);
  const monthSalesPct = getPercentage(data.total_sales.current_month, data.total_sales.last_month);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <Card className="gap-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            {t("dashboard.main.total_revenue")}
          </CardTitle>
          <DollarSign className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.total_revenue.current_month.toLocaleString()} {shop.currency.symbol}
          </div>
          <Trend pct={monthRevPct} />
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
            {data.total_customers.current_month.toLocaleString()} {t("common.quantity_suffix")}
          </div>
          <Trend pct={monthCustPct} />
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
            {data.total_sales.current_month.toLocaleString()} {t("common.quantity_suffix")}
          </div>
          <Trend pct={monthSalesPct} />
        </CardContent>
      </Card>

      <Card className="gap-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            {t("dashboard.main.today_orders")}
          </CardTitle>
          <ShoppingBag className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {todayCount.toLocaleString()} {t("common.quantity_suffix")}
          </div>
          <Trend pct={todayDiff} />
        </CardContent>
      </Card>
    </div>
  );
};
