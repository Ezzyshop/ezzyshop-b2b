import { useTranslation } from "react-i18next";
import { SetupChecklist } from "../components/setup-checklist";
import { OrdersAnalyticsSummary } from "../components/orders-analytics-summary";
import { LowStockAlerts } from "../components/low-stock-alerts";
import { PendingReviews } from "../components/pending-reviews";
import { PlanUsage } from "../components/plan-usage";
import { CouponsSummary } from "../components/coupons-summary";
import { useIsFeatureEnabled } from "@/hooks/use-plan-features";

export const DashboardMainPage = () => {
  const { t } = useTranslation();
  const showOverview = useIsFeatureEnabled("stat_overview");
  const showCoupons = useIsFeatureEnabled("stat_coupons");
  const showLowStock = useIsFeatureEnabled("stat_low_stock");
  const showPendingReviews = useIsFeatureEnabled("stat_pending_reviews");

  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold">
        {t("sidebar.dashboard.main_page")}
      </h2>
      <div className="space-y-4 md:space-y-6">
        <SetupChecklist />

        {showOverview && <OrdersAnalyticsSummary />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <PlanUsage />
          {showCoupons && <CouponsSummary />}
        </div>

        {(showLowStock || showPendingReviews) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {showLowStock && <LowStockAlerts />}
            {showPendingReviews && <PendingReviews />}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardMainPage;
