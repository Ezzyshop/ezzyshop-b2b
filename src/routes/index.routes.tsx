import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ModeratorRoutes } from "./moderator.routes";
import { DashboardRoutes } from "./dashboard.routes";
import { StaticRoutes } from "./static.routes";
import { RegisterRoutes } from "./register.routes";
import { YMaps } from "@pbe/react-yandex-maps";
import { dashboardSidebarData } from "@/lib";

const LoginPage = lazy(() => import("@/features/auth/login/pages/login.page"));
const LogoutPage = lazy(
  () => import("@/features/auth/logout/pages/logout.page")
);

export const IndexRoutes = () => {
  return (
    <YMaps
      query={{
        apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
        lang: "ru_RU",
        ns: "use-load-option",
        load: "Map,Placemark,map.addon.balloon",
      }}
    >
      <Routes>
        <Route
          path="/"
          element={<Navigate to={dashboardSidebarData[0].url} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/moderator/*" element={<ModeratorRoutes />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="/register/*" element={<RegisterRoutes />} />
        <Route path="*" element={<StaticRoutes />} />
      </Routes>
    </YMaps>
  );
};
