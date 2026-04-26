import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ModeratorRoutes } from "./moderator.routes";
import { DashboardRoutes } from "./dashboard/dashboard.routes.tsx";
import { StaticRoutes } from "./static.routes";
import { RegisterRoutes } from "./register.routes";
import { YMaps } from "@pbe/react-yandex-maps";
import { getDefaultPage } from "@/lib/get-default-page.ts";
import { UserRoles } from "@/lib/enums/user.enum.ts";

const LoginPage = lazy(() => import("@/features/auth/login/pages/login.page"));
const LogoutPage = lazy(
  () => import("@/features/auth/logout/pages/logout.page")
);
const TelegramCallbackPage = lazy(
  () =>
    import(
      "@/features/auth/telegram-callback/pages/telegram-callback.page"
    )
);

export const IndexRoutes = () => {
  return (
    <YMaps
      query={{
        apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
        lang: "ru_RU",
        ns: "use-load-option",
        load: "Map,Placemark,Polygon,map.addon.balloon",
      }}
    >
      <Routes>
        <Route
          path="/"
          element={<Navigate to={getDefaultPage([UserRoles.Staff])} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route
          path="/auth/telegram/callback"
          element={<TelegramCallbackPage />}
        />
        <Route path="/moderator/*" element={<ModeratorRoutes />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="/register/*" element={<RegisterRoutes />} />
        <Route path="*" element={<StaticRoutes />} />
      </Routes>
    </YMaps>
  );
};
