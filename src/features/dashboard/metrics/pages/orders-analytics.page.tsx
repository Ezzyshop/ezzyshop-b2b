import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useShopContext } from "@/contexts";
import { getOrdersDetailedAnalyticsQueryFn } from "@/api/queries";
import { MetricsDateFilter, type GroupBy } from "../components/metrics-date-filter";
import { MetricsSummaryCard } from "../components/metrics-summary-card";
import { MetricsLineChart } from "../components/metrics-line-chart";
import { MetricsBarChart } from "../components/metrics-bar-chart";
import { MetricsExportButton } from "../components/metrics-export-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCartIcon, DollarSignIcon, ReceiptIcon, TagIcon } from "lucide-react";

export const OrdersAnalyticsPage = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const chartRef = useRef<HTMLDivElement>(null);

  const [dateRange, setDateRange] = useState({
    startDate: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });
  const [groupBy, setGroupBy] = useState<GroupBy>("day");

  const { data, isLoading } = useQuery({
    queryKey: ["metrics-orders-detailed", shop._id, dateRange, groupBy],
    queryFn: () =>
      getOrdersDetailedAnalyticsQueryFn(shop._id, { ...dateRange, groupBy }),
    enabled: Boolean(shop._id),
  });

  const analytics = data?.data;

  const trendExportData = (analytics?.trend ?? []).map((t) => ({
    date: t.date,
    orders: t.orders,
    revenue: t.revenue,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">{t("metrics.orders.title")}</h2>
        <MetricsExportButton
          data={trendExportData}
          filename="orders-analytics"
          chartRef={chartRef}
        />
      </div>

      <MetricsDateFilter
        dateRange={dateRange}
        onDateChange={setDateRange}
        groupBy={groupBy}
        onGroupByChange={setGroupBy}
      />

      {isLoading ? (
        <div className="text-muted-foreground">{t("common.loading")}</div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsSummaryCard
              title={t("metrics.orders.total_orders")}
              value={analytics?.summary.total_orders ?? 0}
              icon={<ShoppingCartIcon className="w-4 h-4" />}
            />
            <MetricsSummaryCard
              title={t("metrics.orders.total_revenue")}
              value={analytics?.summary.total_revenue ?? 0}
              icon={<DollarSignIcon className="w-4 h-4" />}
            />
            <MetricsSummaryCard
              title={t("metrics.orders.avg_order_value")}
              value={analytics?.summary.avg_order_value ?? 0}
              icon={<ReceiptIcon className="w-4 h-4" />}
            />
            <MetricsSummaryCard
              title={t("metrics.orders.total_discount")}
              value={analytics?.summary.total_discount ?? 0}
              icon={<TagIcon className="w-4 h-4" />}
            />
          </div>

          <div ref={chartRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MetricsLineChart
              title={t("metrics.orders.revenue_trend")}
              data={analytics?.trend ?? []}
              lines={[
                {
                  dataKey: "revenue",
                  label: t("metrics.orders.revenue"),
                  color: "var(--chart-1)",
                },
              ]}
            />
            <MetricsBarChart
              title={t("metrics.orders.orders_trend")}
              data={analytics?.trend ?? []}
              bars={[
                {
                  dataKey: "orders",
                  label: t("metrics.orders.orders"),
                  color: "var(--chart-2)",
                },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {t("metrics.orders.status_breakdown")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("metrics.orders.status")}</TableHead>
                      <TableHead className="text-right">{t("metrics.orders.count")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(analytics?.status_breakdown ?? {}).map(
                      ([status, count]) => (
                        <TableRow key={status}>
                          <TableCell className="capitalize">{status.replace(/_/g, " ")}</TableCell>
                          <TableCell className="text-right">{(count as number).toLocaleString()}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {t("metrics.orders.payment_breakdown")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("metrics.orders.payment_method")}</TableHead>
                      <TableHead className="text-right">{t("metrics.orders.count")}</TableHead>
                      <TableHead className="text-right">{t("metrics.orders.revenue")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(analytics?.payment_breakdown ?? []).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                          {t("common.no_results_found")}
                        </TableCell>
                      </TableRow>
                    ) : (
                      analytics?.payment_breakdown.map((p) => (
                        <TableRow key={p.method}>
                          <TableCell className="capitalize">{p.method}</TableCell>
                          <TableCell className="text-right">{p.count.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{p.revenue.toLocaleString()}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersAnalyticsPage;
