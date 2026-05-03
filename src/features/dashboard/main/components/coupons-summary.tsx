import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Plus, Tag, TicketPercent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useShopContext } from "@/contexts";
import { getCouponsSummaryQueryFn } from "@/api/queries/dashboard-stats.query";
import { useIsFeatureEnabled } from "@/hooks/use-plan-features";
import { PlanFeatureGuard } from "@/layouts/plan-feature-guard.layout";

export const CouponsSummary = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const showCoupons = useIsFeatureEnabled("stat_coupons");

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-stats", shop._id, "coupons-summary"],
    queryFn: () => getCouponsSummaryQueryFn(shop._id),
    enabled: !!shop?._id && showCoupons,
  });

  const stats = [
    {
      label: t("dashboard.main.coupons_active"),
      value: data?.active ?? 0,
      icon: TicketPercent,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: t("dashboard.main.coupons_expiring"),
      value: data?.expiringSoon ?? 0,
      icon: Clock,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      label: t("dashboard.main.coupons_total_redemptions"),
      value: data?.totalRedemptions ?? 0,
      icon: Tag,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <TicketPercent className="h-4 w-4 text-indigo-500" />
          <CardTitle className="text-base font-semibold">
            {t("dashboard.main.coupons_summary")}
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="gap-1 text-xs h-7"
          >
            <Link to="/dashboard/coupons">
              {t("dashboard.main.view_all")}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <PlanFeatureGuard featureKey="stat_coupons">
          {isLoading ? (
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2 p-3 rounded-lg bg-muted/50">
                  <Skeleton className="h-6 w-6 rounded" />
                  <Skeleton className="h-6 w-10" />
                  <Skeleton className="h-3 w-20" />
                </div>
              ))}
            </div>
          ) : !data?.hasCoupons ? (
            <div className="flex flex-col items-center justify-center gap-3 py-6">
              <TicketPercent className="h-10 w-10 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                {t("dashboard.main.no_coupons")}
              </p>
              <Button size="sm" variant="outline" asChild className="gap-1">
                <Link to="/dashboard/coupons">
                  <Plus className="h-3.5 w-3.5" />
                  {t("dashboard.main.create_coupon")}
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {stats.map(({ label, value, icon: Icon, color, bg }) => (
                <div
                  key={label}
                  className={`flex flex-col gap-2 p-3 rounded-lg ${bg}`}
                >
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center bg-white/70`}
                  >
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <div className={`text-2xl font-bold tabular-nums ${color}`}>
                    {value}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </PlanFeatureGuard>
      </CardContent>
    </Card>
  );
};
