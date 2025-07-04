import { DashboardLayout } from "@/layouts/dashboard.layout";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

const DashboardMainPage = lazy(
  () => import("@/features/dashboard/main/pages/main.page")
);

const CategoriesPage = lazy(
  () => import("@/features/dashboard/categories/pages/categories.page")
);

const ProductsPage = lazy(
  () => import("@/features/dashboard/products/pages/products.page")
);

export const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/main" element={<DashboardMainPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </DashboardLayout>
  );
};
