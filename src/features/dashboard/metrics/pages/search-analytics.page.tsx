import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useShopContext } from "@/contexts";
import { getSearchAnalyticsQueryFn } from "@/api/queries";
import {
  MetricsDateFilter,
  type GroupBy,
} from "../components/metrics-date-filter";
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
import { SearchIcon, HashIcon } from "lucide-react";
import { useIsFeatureEnabled } from "@/hooks/use-plan-features";

export const SearchAnalyticsPage = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const chartRef = useRef<HTMLDivElement>(null);
  const isEnabled = useIsFeatureEnabled("analytics_search");

  const [dateRange, setDateRange] = useState({
    startDate: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });
  const [groupBy, setGroupBy] = useState<GroupBy>("day");

  const { data, isLoading } = useQuery({
    queryKey: ["metrics-search", shop._id, dateRange, groupBy],
    queryFn: () =>
      getSearchAnalyticsQueryFn(shop._id, { ...dateRange, groupBy }),
    enabled: Boolean(shop._id) && isEnabled,
  });

  const analytics = data?.data;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">
          {t("metrics.search_analytics.title")}
        </h2>
        <MetricsExportButton
          data={analytics?.keywords ?? []}
          filename="search-analytics"
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
              title={t("metrics.search_analytics.total_searches")}
              value={analytics?.summary.total_searches ?? 0}
              icon={<SearchIcon className="w-4 h-4" />}
            />
            <MetricsSummaryCard
              title={t("metrics.search_analytics.unique_keywords")}
              value={analytics?.summary.unique_keywords ?? 0}
              icon={<HashIcon className="w-4 h-4" />}
            />
          </div>

          <div ref={chartRef}>
            <MetricsLineChart
              title={t("metrics.search_analytics.trend")}
              data={analytics?.trend ?? []}
              lines={[
                {
                  dataKey: "count",
                  label: t("metrics.search_analytics.searches"),
                  color: "var(--chart-1)",
                },
              ]}
            />
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">
                {t("metrics.search_analytics.top_keywords")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>
                      {t("metrics.search_analytics.keyword")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("metrics.search_analytics.count")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("metrics.search_analytics.last_searched")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics?.keywords.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center text-muted-foreground py-8"
                      >
                        {t("common.no_results_found")}
                      </TableCell>
                    </TableRow>
                  ) : (
                    analytics?.keywords.map((kw, idx) => (
                      <TableRow key={kw.keyword}>
                        <TableCell className="text-muted-foreground">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                          {kw.keyword}
                        </TableCell>
                        <TableCell className="text-right">
                          {kw.count.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {dayjs(kw.last_searched).format("MMM D, YYYY")}
                        </TableCell>
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

export default SearchAnalyticsPage;
