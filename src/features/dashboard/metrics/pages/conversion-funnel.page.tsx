import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useShopContext } from "@/contexts";
import { getConversionFunnelQueryFn } from "@/api/queries";
import { MetricsDateFilter } from "../components/metrics-date-filter";
import { MetricsExportButton } from "../components/metrics-export-button";
import { MetricsBarChart } from "../components/metrics-bar-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon } from "lucide-react";
import { useMemo } from "react";

interface FunnelStepProps {
  label: string;
  count: number;
  percent: number;
  dropOff?: number;
  color: string;
}

const FunnelStep = ({ label, count, percent, dropOff, color }: FunnelStepProps) => (
  <div className="flex flex-col items-center gap-1">
    <div
      className="w-full rounded-lg flex flex-col items-center justify-center py-4 px-2 text-white"
      style={{ backgroundColor: color, opacity: 0.85 + percent * 0.15 }}
    >
      <span className="text-xl font-bold">{count.toLocaleString()}</span>
      <span className="text-sm font-medium opacity-90">{label}</span>
      <span className="text-xs opacity-75">{percent}%</span>
    </div>
    {dropOff !== undefined && (
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <ArrowDownIcon className="w-3 h-3 text-red-400" />
        <span className="text-red-400">-{dropOff}% {}</span>
      </div>
    )}
  </div>
);

export const ConversionFunnelPage = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const chartRef = useRef<HTMLDivElement>(null);

  const [dateRange, setDateRange] = useState({
    startDate: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["metrics-funnel", shop._id, dateRange],
    queryFn: () => getConversionFunnelQueryFn(shop._id, dateRange),
    enabled: Boolean(shop._id),
  });

  const analytics = data?.data;

  const steps = useMemo(() => {
    if (!analytics) return [];
    const { add_to_cart, view_cart, begin_checkout, purchase } = analytics.funnel;
    const base = add_to_cart || 1;
    return [
      {
        label: t("metrics.funnel.add_to_cart"),
        count: add_to_cart,
        percent: 100,
        color: "hsl(var(--chart-1))",
      },
      {
        label: t("metrics.funnel.view_cart"),
        count: view_cart,
        percent: Math.round((view_cart / base) * 100),
        dropOff: Math.round(((add_to_cart - view_cart) / base) * 100),
        color: "hsl(var(--chart-2))",
      },
      {
        label: t("metrics.funnel.begin_checkout"),
        count: begin_checkout,
        percent: Math.round((begin_checkout / base) * 100),
        dropOff: Math.round(((view_cart - begin_checkout) / base) * 100),
        color: "hsl(var(--chart-3))",
      },
      {
        label: t("metrics.funnel.purchase"),
        count: purchase,
        percent: Math.round((purchase / base) * 100),
        dropOff: Math.round(((begin_checkout - purchase) / base) * 100),
        color: "hsl(var(--chart-4))",
      },
    ];
  }, [analytics, t]);

  const trendData = useMemo(() => {
    if (!analytics?.daily_trend) return [];
    const byDate: Record<string, Record<string, number>> = {};
    analytics.daily_trend.forEach((row) => {
      const date = row._id.date;
      if (!byDate[date]) byDate[date] = {};
      byDate[date][row._id.event] = row.count;
    });
    return Object.entries(byDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, events]) => ({ date, ...events }));
  }, [analytics]);

  const exportData = steps.map((s) => ({
    step: s.label,
    count: s.count,
    conversion_rate: `${s.percent}%`,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">{t("metrics.funnel.title")}</h2>
        <MetricsExportButton
          data={exportData}
          filename="conversion-funnel"
          chartRef={chartRef}
        />
      </div>

      <MetricsDateFilter
        dateRange={dateRange}
        onDateChange={setDateRange}
        showGroupBy={false}
      />

      {isLoading ? (
        <div className="text-muted-foreground">{t("common.loading")}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("metrics.funnel.checkout_rate")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {analytics?.conversion_rates.checkout_rate ?? 0}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("metrics.funnel.purchase_rate")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {analytics?.conversion_rates.purchase_rate ?? 0}%
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{t("metrics.funnel.funnel_steps")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {steps.map((step, idx) => (
                  <FunnelStep
                    key={step.label}
                    label={step.label}
                    count={step.count}
                    percent={step.percent}
                    dropOff={idx > 0 ? step.dropOff : undefined}
                    color={step.color}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <div ref={chartRef}>
            <MetricsBarChart
              title={t("metrics.funnel.daily_trend")}
              data={trendData}
              bars={[
                { dataKey: "add_to_cart", label: t("metrics.funnel.add_to_cart"), color: "var(--chart-1)" },
                { dataKey: "begin_checkout", label: t("metrics.funnel.begin_checkout"), color: "var(--chart-3)" },
                { dataKey: "purchase", label: t("metrics.funnel.purchase"), color: "var(--chart-4)" },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ConversionFunnelPage;
