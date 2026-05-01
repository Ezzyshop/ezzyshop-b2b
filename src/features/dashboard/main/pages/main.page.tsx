import { useTranslation } from "react-i18next";
import { SetupChecklist } from "../components/setup-checklist";
import { OrdersAnalyticsSummary } from "../components/orders-analytics-summary";
import { RecentOrders } from "../components/recent-orders";
import { LowStockAlerts } from "../components/low-stock-alerts";
import { PendingReviews } from "../components/pending-reviews";
import { PlanUsage } from "../components/plan-usage";
import { CouponsSummary } from "../components/coupons-summary";

export const DashboardMainPage = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold">
        {t("sidebar.dashboard.main_page")}
      </h2>
      <div className="space-y-4 md:space-y-6">
        <SetupChecklist />

        <OrdersAnalyticsSummary />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <PlanUsage />
          <CouponsSummary />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <LowStockAlerts />
          <PendingReviews />
        </div>

        <RecentOrders />
      </div>
    </div>
  );
};

export default DashboardMainPage;
