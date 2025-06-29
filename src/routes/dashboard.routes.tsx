import { DashboardLayout } from "@/layouts/dashboard.layout";
import { Route, Routes } from "react-router-dom";

export const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<>Dashboard</>} />
      </Routes>
    </DashboardLayout>
  );
};
