import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useShopContext } from "@/contexts";
import { getProductViewsAnalyticsQueryFn } from "@/api/queries";
import { MetricsDateFilter, type GroupBy } from "../components/metrics-date-filter";
import { MetricsSummaryCard } from "../components/metrics-summary-card";
import { MetricsLineChart } from "../components/metrics-line-chart";
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
import { EyeIcon, PackageIcon } from "lucide-react";

export const ProductViewsPage = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const chartRef = useRef<HTMLDivElement>(null);

  const [dateRange, setDateRange] = useState({
    startDate: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });
  const [groupBy, setGroupBy] = useState<GroupBy>("day");

  const { data, isLoading } = useQuery({
    queryKey: ["metrics-product-views", shop._id, dateRange, groupBy],
    queryFn: () =>
      getProductViewsAnalyticsQueryFn(shop._id, { ...dateRange, groupBy }),
    enabled: Boolean(shop._id),
  });

  const analytics = data?.data;

  const tableData = (analytics?.products ?? []).map((p) => ({
    name: p.name?.uz ?? "-",
    total_views: p.total_views,
    unique_views: p.unique_views,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">{t("metrics.product_views.title")}</h2>
        <MetricsExportButton
          data={tableData}
          filename="product-views"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricsSummaryCard
              title={t("metrics.product_views.total_views")}
              value={analytics?.summary.total_views ?? 0}
              icon={<EyeIcon className="w-4 h-4" />}
            />
            <MetricsSummaryCard
              title={t("metrics.product_views.unique_products")}
              value={analytics?.summary.unique_products_viewed ?? 0}
              icon={<PackageIcon className="w-4 h-4" />}
            />
          </div>

          <div ref={chartRef}>
            <MetricsLineChart
              title={t("metrics.product_views.trend")}
              data={analytics?.trend ?? []}
              lines={[
                {
                  dataKey: "count",
                  label: t("metrics.product_views.views"),
                  color: "var(--chart-2)",
                },
              ]}
            />
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                {t("metrics.product_views.top_products")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>{t("metrics.common.product")}</TableHead>
                    <TableHead className="text-right">
                      {t("metrics.product_views.total_views")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("metrics.product_views.unique_views")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics?.products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        {t("common.no_results_found")}
                      </TableCell>
                    </TableRow>
                  ) : (
                    analytics?.products.map((p, idx) => (
                      <TableRow key={p.product_id}>
                        <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {p.main_image && (
                              <img
                                src={p.main_image}
                                alt=""
                                className="w-8 h-8 rounded object-cover"
                              />
                            )}
                            <span className="font-medium">{p.name?.uz ?? "-"}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{p.total_views.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{p.unique_views.toLocaleString()}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ProductViewsPage;
