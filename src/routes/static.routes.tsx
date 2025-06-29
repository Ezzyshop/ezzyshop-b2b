import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const NotFoundPage = lazy(
  () => import("@/modules/static/not-found/pages/not-found.page")
);

export const StaticRoutes = () => {
  return (
    <Routes>
      <Route path="not-found" element={<NotFoundPage />} />
    </Routes>
  );
};
