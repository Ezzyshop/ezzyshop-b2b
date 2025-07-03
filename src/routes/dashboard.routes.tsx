import { DashboardLayout } from "@/layouts/dashboard.layout";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

const DashboardMainPage = lazy(
  () => import("@/modules/dashboard/main/pages/main.page")
);

export const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/main" element={<DashboardMainPage />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </DashboardLayout>
  );
};
