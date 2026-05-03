import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import {
  ArrowRight,
  DollarSignIcon,
  ReceiptIcon,
  ShoppingCartIcon,
  TagIcon,
  TruckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShopContext } from "@/contexts";
import { getOrdersDetailedAnalyticsQueryFn } from "@/api/queries/analytics.query";
import { MetricsSummaryCard } from "@/features/dashboard/metrics/components/metrics-summary-card";
import { MetricsDateFilter } from "@/features/dashboard/metrics/components/metrics-date-filter";
import { useIsFeatureEnabled } from "@/hooks/use-plan-features";

export const OrdersAnalyticsSummary = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const showOverview = useIsFeatureEnabled("analytics_orders");

  const [dateRange, setDateRange] = useState({
    startDate: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });
  const { data, isLoading } = useQuery({
    queryKey: ["metrics-orders-detailed", shop._id, dateRange],
    queryFn: () =>
      getOrdersDetailedAnalyticsQueryFn(shop._id, { ...dateRange }),
    enabled: Boolean(shop._id) && showOverview,
  });

  const analytics = data?.data;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <MetricsDateFilter
          dateRange={dateRange}
          onDateChange={setDateRange}
          showGroupBy={false}
        />
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="gap-1 text-xs h-8 self-start sm:self-auto shrink-0"
        >
          <Link to="/dashboard/metrics/orders">
            {t("dashboard.main.view_all")}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-[100px] rounded-lg bg-muted animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <MetricsSummaryCard
              title={t("metrics.orders.total_orders")}
              value={analytics?.summary.total_orders ?? 0}
              icon={<ShoppingCartIcon className="w-4 h-4" />}
            />
            <MetricsSummaryCard
              title={t("metrics.orders.total_revenue")}
              value={analytics?.summary.total_revenue ?? 0}
              suffix={shop.currency.symbol}
              icon={<DollarSignIcon className="w-4 h-4" />}
            />
            <MetricsSummaryCard
              title={t("metrics.orders.avg_order_value")}
              value={analytics?.summary.avg_order_value ?? 0}
              suffix={shop.currency.symbol}
              icon={<ReceiptIcon className="w-4 h-4" />}
            />
            <MetricsSummaryCard
              title={t("metrics.orders.total_discount")}
              value={analytics?.summary.total_discount ?? 0}
              suffix={shop.currency.symbol}
              icon={<TagIcon className="w-4 h-4" />}
            />
            <MetricsSummaryCard
              title={t("metrics.orders.delivery_total")}
              value={analytics?.summary.delivery_total ?? 0}
              suffix={shop.currency.symbol}
              icon={<TruckIcon className="w-4 h-4" />}
            />
          </div>
        </>
      )}
    </div>
  );
};
