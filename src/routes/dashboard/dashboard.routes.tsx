import { DashboardLayout } from "@/layouts/dashboard.layout";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/layouts/protected-route.layout";
import { dashboardRoutes } from "./dashboard.routes";

export const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        {dashboardRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute roles={route.roles}>
                {<route.element />}
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </DashboardLayout>
  );
};
