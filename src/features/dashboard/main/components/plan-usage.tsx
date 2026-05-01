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

interface UsageRowProps {
  label: string;
  used: number;
  max: number;
  unlimited: string;
}

const UsageRow = ({ label, used, max, unlimited }: UsageRowProps) => {
  const isUnlimited = max === -1 || max === 0;
  const pct = isUnlimited ? 0 : Math.min((used / max) * 100, 100);
  const isNearLimit = !isUnlimited && pct >= 80;
  const isAtLimit = !isUnlimited && pct >= 100;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={`font-medium tabular-nums ${isAtLimit ? "text-red-600" : isNearLimit ? "text-orange-500" : ""}`}>
          {isUnlimited ? (
            <span className="text-xs text-muted-foreground">{unlimited}</span>
          ) : (
            `${used.toLocaleString()} / ${max.toLocaleString()}`
          )}
        </span>
      </div>
      {!isUnlimited && (
        <Progress
          value={pct}
          className={`h-1.5 ${isAtLimit ? "[&>div]:bg-red-500" : isNearLimit ? "[&>div]:bg-orange-400" : ""}`}
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
        <Button variant="outline" size="sm" asChild className="gap-1 text-xs h-7">
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
        ) : (
          <>
            <UsageRow
              label={t("dashboard.main.products_limit")}
              used={data?.products.used ?? 0}
              max={data?.products.max ?? 0}
              unlimited={t("dashboard.main.unlimited")}
            />
            <UsageRow
              label={t("dashboard.main.categories_limit")}
              used={data?.categories.used ?? 0}
              max={data?.categories.max ?? 0}
              unlimited={t("dashboard.main.unlimited")}
            />
            <UsageRow
              label={t("dashboard.main.orders_limit")}
              used={data?.orders.used ?? 0}
              max={data?.orders.max ?? 0}
              unlimited={t("dashboard.main.unlimited")}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};
