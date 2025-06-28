import { DashboardLayout } from "@/layouts/dashboad.layout";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const StatisticsPage = lazy(
  () => import("@/modules/dashboard/statistics/pages/statistics.page.tsx")
);

const ShopsPage = lazy(
  () => import("@/modules/dashboard/shops/pages/shops.page.tsx")
);

const ShopCreatePage = lazy(
  () => import("@/modules/dashboard/shops/pages/shop-create.page.tsx")
);

const ShopEditPage = lazy(
  () => import("@/modules/dashboard/shops/pages/shop-edit.page.tsx")
);

const ShopTelegramEditPage = lazy(
  () => import("@/modules/dashboard/shops/pages/shop-telegram-edit.page.tsx")
);

const ShopPlanChangePage = lazy(
  () => import("@/modules/dashboard/shops/pages/shop-plan-change.tsx")
);

export const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/shops/">
          <Route index element={<ShopsPage />} />
          <Route path="create" element={<ShopCreatePage />} />
          <Route path=":id/edit" element={<ShopEditPage />} />
          <Route path=":id/telegram" element={<ShopTelegramEditPage />} />
          <Route path=":id/plan" element={<ShopPlanChangePage />} />
        </Route>
      </Routes>
    </DashboardLayout>
  );
};
