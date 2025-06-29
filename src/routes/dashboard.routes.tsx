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

const PlansPage = lazy(
  () => import("@/modules/dashboard/plans/pages/plans.page.tsx")
);

const PlanCreatePage = lazy(
  () => import("@/modules/dashboard/plans/pages/plan-create.page.tsx")
);

const PlanEditPage = lazy(
  () => import("@/modules/dashboard/plans/pages/plan-edit.page.tsx")
);

const CurrenciesPage = lazy(
  () => import("@/modules/dashboard/currencies/pages/currencies.page.tsx")
);

const CurrencyCreatePage = lazy(
  () => import("@/modules/dashboard/currencies/pages/currency-create.page.tsx")
);

const CurrencyEditPage = lazy(
  () => import("@/modules/dashboard/currencies/pages/currency-edit.page.tsx")
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
        <Route path="/plans/">
          <Route index element={<PlansPage />} />
          <Route path="create" element={<PlanCreatePage />} />
          <Route path=":id/edit" element={<PlanEditPage />} />
        </Route>
        <Route path="/currencies">
          <Route index element={<CurrenciesPage />} />
          <Route path="create" element={<CurrencyCreatePage />} />
          <Route path=":id/edit" element={<CurrencyEditPage />} />
        </Route>
      </Routes>
    </DashboardLayout>
  );
};
