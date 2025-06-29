import { DashboardLayout } from "@/layouts/dashboard.layout";
import { Navigate, Route, Routes } from "react-router-dom";

export const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<>Dashboard</>} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </DashboardLayout>
  );
};
