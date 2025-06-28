import { DashboardLayout } from "@/layouts/dashboad.layout";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const StatisticsPage = lazy(
  () => import("@/modules/dashboard/statistics/pages/statistics.page.tsx")
);

export const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </DashboardLayout>
  );
};
