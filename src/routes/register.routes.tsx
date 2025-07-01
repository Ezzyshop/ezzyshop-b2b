import { RegisterShopContextProvider } from "@/contexts";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const CreateShopPage = lazy(
  () => import("@/modules/register/create-shop/pages/create-shop.page")
);

const CreateTelegramPage = lazy(
  () => import("@/modules/register/create-telegram/pages/create-telegram.page")
);

const CreateSuccessPage = lazy(
  () => import("@/modules/register/create-success/pages/create-success.page")
);

export const RegisterRoutes = () => {
  return (
    <RegisterShopContextProvider>
      <Routes>
        <Route path="/create-telegram" element={<CreateTelegramPage />} />
        <Route path="/create-shop" element={<CreateShopPage />} />
        <Route path="/finish" element={<CreateSuccessPage />} />
        <Route path="*" element={<Navigate to="/register/create-telegram" />} />
      </Routes>
    </RegisterShopContextProvider>
  );
};
