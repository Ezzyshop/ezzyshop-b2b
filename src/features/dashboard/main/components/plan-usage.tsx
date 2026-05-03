import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowUpRight, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useShopContext } from "@/contexts";
import { getPlanUsageQueryFn } from "@/api/queries/dashboard-stats.query";
import { PLAN_FEATURE_MAP } from "@/lib/plan-features.const";

interface UsageRowProps {
  label: string;
  used: number;
  max: number;
}

const UsageRow = ({ label, used, max }: UsageRowProps) => {
  const isUnlimited = max === -1;
  const pct = isUnlimited ? 0 : Math.min((used / max) * 100, 100);
  const isNearLimit = !isUnlimited && pct >= 80;
  const isAtLimit = !isUnlimited && pct >= 100;

  if (isUnlimited) return;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span
          className={`font-medium tabular-nums ${
            isAtLimit ? "text-red-600" : isNearLimit ? "text-orange-500" : ""
          }`}
        >
          {used.toLocaleString()} / {max.toLocaleString()}
        </span>
      </div>
      {!isUnlimited && (
        <Progress
          value={pct}
          className={`h-1.5 ${
            isAtLimit
              ? "[&>div]:bg-red-500"
              : isNearLimit
                ? "[&>div]:bg-orange-400"
                : ""
          }`}
        />
      )}
    </div>
  );
};

export const PlanUsage = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-stats", shop._id, "plan-usage"],
    queryFn: () => getPlanUsageQueryFn(shop._id),
    enabled: !!shop?._id,
  });

  const planName = data?.planName ?? shop.plan?.name ?? "";
  const features = data?.features ?? [];

  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-violet-500" />
          <div>
            <CardTitle className="text-base font-semibold">
              {t("dashboard.main.plan_usage")}
            </CardTitle>
            {planName && (
              <p className="text-xs text-muted-foreground mt-0.5">{planName}</p>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-1 text-xs h-7"
        >
          <Link to="/dashboard/plans">
            {t("dashboard.main.upgrade_plan")}
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-1.5 w-full" />
              </div>
            ))}
          </div>
        ) : features.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-2">
            {t("dashboard.main.no_features")}
          </p>
        ) : (
          features.map((feature) => (
            <UsageRow
              key={feature.key}
              label={PLAN_FEATURE_MAP[feature.key]?.label ?? feature.key}
              used={feature.used}
              max={feature.max}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};
