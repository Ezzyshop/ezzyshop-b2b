import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardRoutes } from "./dashboard.routes";

const LoginPage = lazy(() => import("@/modules/auth/login/pages/login.page"));
const LogoutPage = lazy(
  () => import("@/modules/auth/logout/pages/logout.page")
);

export const IndexRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
      <Route path="*" element={<Navigate to="/dashboard/statistics" />} />
    </Routes>
  );
};
