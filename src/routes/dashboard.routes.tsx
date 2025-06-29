import { DashboardLayout } from "@/layouts/dashboard.layout";
import { ProtectedRoute } from "@/layouts/protected-route.layout";
import { UserRoles } from "@/lib/enums";
import { Navigate, Route, Routes } from "react-router-dom";

export const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <ProtectedRoute
        roles={[UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Staff]}
      >
        <Routes>
          <Route path="/" element={<>Dashboard</>} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </ProtectedRoute>
    </DashboardLayout>
  );
};
