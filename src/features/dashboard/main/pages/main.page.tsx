import { StatisticsCard } from "../components/statistics-card";
import { SalesChart } from "../components/sales-chart";
import { RecentSales } from "../components/recent-sales";
import { useTranslation } from "react-i18next";
import { RevenueChart } from "../components/revenue-chart";
import { SetupChecklist } from "../components/setup-checklist";

export const DashboardMainPage = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold">
        {t("sidebar.dashboard.main_page")}
      </h2>
      <div className="space-y-4 md:space-y-6">
        <SetupChecklist />
        <StatisticsCard />
        <RevenueChart />

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-6">
          <div className="md:col-span-4">
            <SalesChart />
          </div>
          <RecentSales />
        </div>
      </div>
    </div>
  );
};

export default DashboardMainPage;
