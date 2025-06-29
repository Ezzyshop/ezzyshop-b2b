import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ModeratorRoutes } from "./moderator.routes";
import { DashboardRoutes } from "./dashboard.routes";
import { StaticRoutes } from "./static.routes";

const LoginPage = lazy(() => import("@/modules/auth/login/pages/login.page"));
const LogoutPage = lazy(
  () => import("@/modules/auth/logout/pages/logout.page")
);

export const IndexRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/moderator/*" element={<ModeratorRoutes />} />
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
      <Route path="*" element={<StaticRoutes />} />
    </Routes>
  );
};
