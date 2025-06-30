import { RegisterLayout } from "@/layouts/register.layout";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const CreateBotPage = lazy(
  () => import("@/modules/register/create-bot/pages/create-bot.page")
);
const CreateShopPage = lazy(
  () => import("@/modules/register/create-shop/pages/create-shop.page")
);

export const RegisterRoutes = () => {
  return (
    <RegisterLayout>
      <Routes>
        <Route path="/create-shop" element={<CreateShopPage />} />
        <Route path="/create-bot" element={<CreateBotPage />} />
      </Routes>
    </RegisterLayout>
  );
};
