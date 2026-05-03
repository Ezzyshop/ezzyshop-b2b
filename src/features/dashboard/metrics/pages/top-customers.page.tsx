import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useShopContext } from "@/contexts";
import { getTopCustomersAnalyticsQueryFn } from "@/api/queries";
import { MetricsDateFilter } from "../components/metrics-date-filter";
import { MetricsSummaryCard } from "../components/metrics-summary-card";
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
import { Button } from "@/components/ui/button";
import {
  TrophyIcon,
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useIsFeatureEnabled } from "@/hooks/use-plan-features";

const PAGE_SIZE = 20;

export const TopCustomersPage = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const isEnabled = useIsFeatureEnabled("analytics_orders");

  const [dateRange, setDateRange] = useState({
    startDate: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["metrics-top-customers", shop._id, dateRange, page],
    queryFn: () =>
      getTopCustomersAnalyticsQueryFn(shop._id, {
        ...dateRange,
        page,
        limit: PAGE_SIZE,
      }),
    enabled: Boolean(shop._id) && isEnabled,
  });

  const analytics = data?.data;

  const tableData = (analytics?.customers ?? []).map((c) => ({
    rank: c.rank,
    name: c.name ?? "-",
    phone: c.phone ?? "-",
    total_spent: c.total_spent,
    order_count: c.order_count,
    last_order: dayjs(c.last_order).format("YYYY-MM-DD"),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">
          {t("metrics.top_customers.title")}
        </h2>
        <MetricsExportButton data={tableData} filename="top-customers" />
      </div>

      <MetricsDateFilter
        dateRange={dateRange}
        onDateChange={(r) => {
          setDateRange(r);
          setPage(1);
        }}
        showGroupBy={false}
      />

      {isLoading ? (
        <div className="text-muted-foreground">{t("common.loading")}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricsSummaryCard
              title={t("metrics.top_customers.total_revenue")}
              value={analytics?.summary.total_revenue ?? 0}
              icon={<TrophyIcon className="w-4 h-4" />}
            />
            <MetricsSummaryCard
              title={t("metrics.top_customers.unique_customers")}
              value={analytics?.summary.unique_customers ?? 0}
              icon={<UsersIcon className="w-4 h-4" />}
            />
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                {t("metrics.top_customers.ranking")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("metrics.top_customers.rank")}</TableHead>
                    <TableHead>{t("metrics.top_customers.name")}</TableHead>
                    <TableHead>{t("metrics.top_customers.phone")}</TableHead>
                    <TableHead className="text-right">
                      {t("metrics.top_customers.total_spent")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("metrics.top_customers.order_count")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("metrics.top_customers.last_order")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics?.customers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground py-8"
                      >
                        {t("common.no_results_found")}
                      </TableCell>
                    </TableRow>
                  ) : (
                    analytics?.customers.map((c) => (
                      <TableRow key={c.user_id ?? c.rank}>
                        <TableCell>
                          <span
                            className={`font-bold ${c.rank <= 3 ? "text-yellow-500" : "text-muted-foreground"}`}
                          >
                            #{c.rank}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">
                          {c.name ?? "-"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {c.phone ?? "-"}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {c.total_spent.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {c.order_count}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {dayjs(c.last_order).format("MMM D, YYYY")}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              <div className="flex items-center justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {t("common.previous")} / {t("common.next")}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={(analytics?.customers.length ?? 0) < PAGE_SIZE}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default TopCustomersPage;
