import { DashboardLayout } from "@/layouts/dashboard.layout";
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import NotFoundPage from "@/features/static/not-found/pages/not-found.page";

const DashboardMainPage = lazy(
  () => import("@/features/dashboard/main/pages/main.page")
);

const CategoriesPage = lazy(
  () => import("@/features/dashboard/categories/pages/categories.page")
);

const ProductsPage = lazy(
  () => import("@/features/dashboard/products/pages/products.page")
);

const PlansPage = lazy(
  () => import("@/features/dashboard/plans/pages/plans.page")
);

const SettingsPage = lazy(
  () => import("@/features/dashboard/settings/pages/settings.page")
);

export const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/main" element={<DashboardMainPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage isDashboard />} />
      </Routes>
    </DashboardLayout>
  );
};
