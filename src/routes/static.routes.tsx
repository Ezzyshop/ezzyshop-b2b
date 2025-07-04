import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const NotFoundPage = lazy(
  () => import("@/features/static/not-found/pages/not-found.page")
);
const ServerErrorPage = lazy(
  () => import("@/features/static/server-error/pages/server-error.page")
);

export const StaticRoutes = () => {
  return (
    <Routes>
      <Route path="not-found" element={<NotFoundPage />} />
      <Route path="server-error" element={<ServerErrorPage />} />
    </Routes>
  );
};
