import { ModeratorLayout } from "@/layouts/moderator.layout";
import { ProtectedRoute } from "@/layouts/protected-route.layout";
import { UserRoles } from "@/lib/enums";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const StatisticsPage = lazy(
  () => import("@/features/moderator/statistics/pages/statistics.page")
);

const UsersPage = lazy(
  () => import("@/features/moderator/users/pages/users.page")
);

const UserCreatePage = lazy(
  () => import("@/features/moderator/users/pages/user-create.page")
);

const UserEditPage = lazy(
  () => import("@/features/moderator/users/pages/user-edit.page")
);

const ShopsPage = lazy(
  () => import("@/features/moderator/shops/pages/shops.page")
);

const ShopCreatePage = lazy(
  () => import("@/features/moderator/shops/pages/shop-create.page")
);

const ShopEditPage = lazy(
  () => import("@/features/moderator/shops/pages/shop-edit.page")
);

const ShopPlanChangePage = lazy(
  () => import("@/features/moderator/shops/pages/shop-plan-change")
);

const PlansPage = lazy(
  () => import("@/features/moderator/plans/pages/plans.page")
);

const PlanCreatePage = lazy(
  () => import("@/features/moderator/plans/pages/plan-create.page")
);

const PlanEditPage = lazy(
  () => import("@/features/moderator/plans/pages/plan-edit.page")
);

const CurrenciesPage = lazy(
  () => import("@/features/moderator/currencies/pages/currencies.page")
);

const CurrencyCreatePage = lazy(
  () => import("@/features/moderator/currencies/pages/currency-create.page")
);

const CurrencyEditPage = lazy(
  () => import("@/features/moderator/currencies/pages/currency-edit.page")
);

export const ModeratorRoutes = () => {
  return (
    <ModeratorLayout>
      <ProtectedRoute roles={[UserRoles.SuperAdmin]}>
        <Routes>
          <Route path="/" element={<Navigate to="/moderator/statistics" />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/users">
            <Route index element={<UsersPage />} />
            <Route path="create" element={<UserCreatePage />} />
            <Route path=":id/edit" element={<UserEditPage />} />
          </Route>
          <Route path="/shops/">
            <Route index element={<ShopsPage />} />
            <Route path="create" element={<ShopCreatePage />} />
            <Route path=":id/edit" element={<ShopEditPage />} />
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
          <Route path="*" element={<Navigate to="/moderator/statistics" />} />
        </Routes>
      </ProtectedRoute>
    </ModeratorLayout>
  );
};
