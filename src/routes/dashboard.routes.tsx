import { DashboardLayout } from "@/layouts/dashboard.layout";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import CategoriesPage from "@/features/dashboard/categories/pages/categories.page";

const DashboardMainPage = lazy(
  () => import("@/features/dashboard/main/pages/main.page")
);

export const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/main" element={<DashboardMainPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </DashboardLayout>
  );
};
