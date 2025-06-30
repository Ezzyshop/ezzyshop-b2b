import { RegisterLayout } from "@/layouts/register.layout";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const CreateShopPage = lazy(
  () => import("@/modules/register/create-shop/pages/create-shop.page")
);

export const RegisterRoutes = () => {
  return (
    <RegisterLayout>
      <Routes>
        <Route path="/create-shop" element={<CreateShopPage />} />
        <Route path="/create-category" element={<h2>Category</h2>} />
        <Route path="/create-product" element={<h2>Product</h2>} />
        <Route path="/finish" element={<h2>Finish</h2>} />
        <Route path="*" element={<Navigate to="/register/create-shop" />} />
      </Routes>
    </RegisterLayout>
  );
};
