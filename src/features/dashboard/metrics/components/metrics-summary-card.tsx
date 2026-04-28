import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

interface IProps {
  title: string;
  value: string | number;
  previousValue?: number;
  suffix?: string;
  icon?: React.ReactNode;
}

export const MetricsSummaryCard = ({
  title,
  value,
  previousValue,
  suffix,
  icon,
}: IProps) => {
  const numericValue = typeof value === "number" ? value : parseFloat(String(value));
  const hasTrend =
    previousValue !== undefined && previousValue !== 0 && !isNaN(numericValue);
  const trendPct = hasTrend
    ? Math.round(((numericValue - previousValue!) / previousValue!) * 100)
    : null;
  const isPositive = trendPct !== null && trendPct >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof value === "number" ? value.toLocaleString() : value}
          {suffix && (
            <span className="text-sm font-normal text-muted-foreground ml-1">
              {suffix}
            </span>
          )}
        </div>
        {trendPct !== null && (
          <p
            className={`text-xs mt-1 flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-500"}`}
          >
            {isPositive ? (
              <TrendingUpIcon className="w-3 h-3" />
            ) : (
              <TrendingDownIcon className="w-3 h-3" />
            )}
            {isPositive ? "+" : ""}
            {trendPct}% vs prev. period
          </p>
        )}
      </CardContent>
    </Card>
  );
};
