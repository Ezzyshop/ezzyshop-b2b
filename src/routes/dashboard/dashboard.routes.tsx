import { DashboardLayout } from "@/layouts/dashboard.layout";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/layouts/protected-route.layout";
import { PlanFeatureGuard } from "@/layouts/plan-feature-guard.layout";
import { dashboardRoutes } from "./dashboard.routes";
import { usePermissionContext } from "@/contexts/permission-context";
import type { RouteAccess, PermissionResource, PermissionAction } from "@/lib/types/permission.types";

const checkAccess = (
  access: RouteAccess,
  isAdmin: boolean,
  hasPermission: (r: PermissionResource, a: PermissionAction) => boolean,
): boolean => {
  if (access.accessType === "admin-only") return isAdmin;
  if (access.accessType === "permission") return hasPermission(access.resource, access.action);
  return true;
};

const DefaultDashboardRedirect = () => {
  const { isAdmin, hasPermission, isLoading } = usePermissionContext();

  if (isLoading) return null;

  for (const route of dashboardRoutes) {
    if (route.path === "*") continue;

    if (route.children?.length) {
      for (const child of route.children) {
        if (child.path === "*") continue;
        if (checkAccess(child.access, isAdmin, hasPermission)) {
          return <Navigate to={`/dashboard${child.path}`} replace />;
        }
      }
    } else if (route.element && checkAccess(route.access, isAdmin, hasPermission)) {
      return <Navigate to={`/dashboard${route.path}`} replace />;
    }
  }

  return <Navigate to="/not-found" replace />;
};

export const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DefaultDashboardRedirect />} />
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
                    <ProtectedRoute access={child.access}>
                      {child.planFeature ? (
                        <PlanFeatureGuard featureKey={child.planFeature}>
                          <child.element />
                        </PlanFeatureGuard>
                      ) : (
                        <child.element />
                      )}
                    </ProtectedRoute>
                  }
                />
              )),
            ];
          }

          if (!route.element) return null;

          const El = route.element as React.ComponentType;

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute access={route.access}>
                  {route.planFeature ? (
                    <PlanFeatureGuard featureKey={route.planFeature}>
                      <El />
                    </PlanFeatureGuard>
                  ) : (
                    <El />
                  )}
                </ProtectedRoute>
              }
            />
          );
        })}
      </Routes>
    </DashboardLayout>
  );
};
