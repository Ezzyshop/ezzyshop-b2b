import { DashboardLayout } from "@/layouts/dashboard.layout";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/layouts/protected-route.layout";
import { dashboardRoutes } from "./dashboard.routes";

export const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        {dashboardRoutes.map((route) => {
          if (route.children?.length) {
            const firstChild = route.children[0];
            return [
              <Route
                key={route.path}
                path={route.path}
                element={<Navigate to={`/dashboard${firstChild.path}`} replace />}
              />,
              ...route.children.map((child) => (
                <Route
                  key={child.path}
                  path={child.path}
                  element={
                    <ProtectedRoute roles={child.roles}>
                      {<child.element />}
                    </ProtectedRoute>
                  }
                />
              )),
            ];
          }

          if (!route.element) return null;

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute roles={route.roles}>
                  {<route.element />}
                </ProtectedRoute>
              }
            />
          );
        })}
      </Routes>
    </DashboardLayout>
  );
};
