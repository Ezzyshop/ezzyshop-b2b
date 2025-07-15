import { RegisterShopContextProvider, UserContextProvider } from "@/contexts";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const CreateShopPage = lazy(
  () => import("@/features/register/create-shop/pages/create-shop.page")
);

const CreatePlatformPage = lazy(
  () => import("@/features/register/create-platform/pages/create-platform.page")
);

const CreateSuccessPage = lazy(
  () => import("@/features/register/create-success/pages/create-success.page")
);

export const RegisterRoutes = () => {
  return (
    <UserContextProvider>
      <RegisterShopContextProvider>
        <Routes>
          <Route path="/create-platform" element={<CreatePlatformPage />} />
          <Route path="/create-shop" element={<CreateShopPage />} />
          <Route path="/finish" element={<CreateSuccessPage />} />
          <Route path="*" element={<Navigate to="/register/create-shop" />} />
        </Routes>
      </RegisterShopContextProvider>
    </UserContextProvider>
  );
};
