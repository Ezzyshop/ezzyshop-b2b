import { RegisterShopContextProvider, UserContextProvider } from "@/contexts";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const CreateShopPage = lazy(
  () => import("@/features/register/create-shop/pages/create-shop.page")
);

const CreateTelegramPage = lazy(
  () => import("@/features/register/create-telegram/pages/create-telegram.page")
);

const CreateSuccessPage = lazy(
  () => import("@/features/register/create-success/pages/create-success.page")
);

export const RegisterRoutes = () => {
  return (
    <UserContextProvider>
      <RegisterShopContextProvider>
        <Routes>
          <Route path="/create-telegram" element={<CreateTelegramPage />} />
          <Route path="/create-shop" element={<CreateShopPage />} />
          <Route path="/finish" element={<CreateSuccessPage />} />
          <Route
            path="*"
            element={<Navigate to="/register/create-telegram" />}
          />
        </Routes>
      </RegisterShopContextProvider>
    </UserContextProvider>
  );
};
