import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useShopContext } from "@/contexts";
import { getPendingReviewsQueryFn } from "@/api/queries/dashboard-stats.query";
import { PlanFeatureGuard } from "@/layouts/plan-feature-guard.layout";
import { useIsFeatureEnabled } from "@/hooks/use-plan-features";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
      />
    ))}
  </div>
);

export const PendingReviews = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const showPendingReviews = useIsFeatureEnabled("stat_pending_reviews");

  const { data: pendingReviews = [], isLoading } = useQuery({
    queryKey: ["dashboard-stats", shop._id, "pending-reviews"],
    queryFn: () => getPendingReviewsQueryFn(shop._id),
    enabled: !!shop?._id && showPendingReviews,
  });

  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-blue-500" />
          <CardTitle className="text-base font-semibold">
            {t("dashboard.main.pending_reviews")}
          </CardTitle>
          {!isLoading && pendingReviews.length > 0 && (
            <Badge variant="secondary" className="text-xs h-5 px-1.5">
              {pendingReviews.length}
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="sm" asChild className="gap-1 text-xs h-7">
          <Link to="/dashboard/reviews">
            {t("dashboard.main.view_all")}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <PlanFeatureGuard featureKey="stat_pending_reviews">
          {isLoading ? (
            <div className="space-y-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          ) : pendingReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 gap-2 text-sm text-muted-foreground">
              <MessageSquare className="h-8 w-8 text-muted-foreground/40" />
              {t("dashboard.main.no_pending_reviews")}
            </div>
          ) : (
            <div className="divide-y">
              {pendingReviews.map((review) => {
                const productName =
                  review.product?.name?.uz ||
                  review.product?.name?.ru ||
                  review.product?.name?.en ||
                  "";
                return (
                  <Link
                    key={review._id}
                    to="/dashboard/reviews"
                    className="flex items-center gap-3 px-6 py-3 hover:bg-muted/40 transition-colors"
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="text-xs">
                        {review.user.full_name?.charAt(0) ?? "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {review.user.full_name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {productName}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <StarRating rating={review.rating} />
                      {review.message && (
                        <p className="text-xs text-muted-foreground max-w-[120px] truncate">
                          {review.message}
                        </p>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs px-2 shrink-0"
                      asChild
                    >
                      <span>{t("dashboard.main.reply")}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          )}
        </PlanFeatureGuard>
      </CardContent>
    </Card>
  );
};
