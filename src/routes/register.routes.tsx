import { RegisterShopContextProvider } from "@/contexts";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const CreateShopPage = lazy(
  () => import("@/modules/register/create-shop/pages/create-shop.page")
);

const CreateTelegramPage = lazy(
  () => import("@/modules/register/create-shop/pages/create-telegram.page")
);

export const RegisterRoutes = () => {
  return (
    <RegisterShopContextProvider>
      <Routes>
        <Route path="/create-telegram" element={<CreateTelegramPage />} />
        <Route path="/create-shop" element={<CreateShopPage />} />
        <Route path="/create-category" element={<h2>Category</h2>} />
        <Route path="/create-product" element={<h2>Product</h2>} />
        <Route path="/finish" element={<h2>Finish</h2>} />
        <Route path="*" element={<Navigate to="/register/create-shop" />} />
      </Routes>
    </RegisterShopContextProvider>
  );
};
