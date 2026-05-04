import { PropsWithChildren, useState } from "react";
import { useUserContext } from "../user-context";
import { Navigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getByShopByIdQueryFn, getShopQueryFn } from "@/api/queries";
import { LoaderWithOverlay } from "@/components/loaders/global-loader";
import { ShopContext } from "./shop.context";
import { IUserShop } from "@/lib/interfaces";
import { UserRoles } from "@/lib/enums";

export const ShopContextProvider = ({ children }: PropsWithChildren) => {
  const { user } = useUserContext();
  const [searchParams] = useSearchParams();

  const isSuperAdmin = user.roles.includes(UserRoles.SuperAdmin);
  const hasUserShop = user.shops.length;
  const [activeShop, setActiveShop] = useState<IUserShop | null>(() => {
    const shopId = searchParams.get("shopId");
    if (shopId) {
      const found = user.shops.find((s) => s.shop._id === shopId);
      if (found) return found.shop;
    }
    return user.shops[0]?.shop || null;
  });

  const shop = useQuery({
    queryKey: ["shop", activeShop?._id],
    queryFn: () =>
      isSuperAdmin
        ? getShopQueryFn(activeShop!._id)
        : getByShopByIdQueryFn(activeShop!._id),
    enabled: Boolean(activeShop?._id),
  });

  if (!isSuperAdmin && (!hasUserShop || !activeShop)) {
    return <Navigate to="/register" />;
  }

  if (!shop.isLoading && !shop.data?.data) {
    return <Navigate to="/register" />;
  }

  if (!shop.data?.data) {
    return <LoaderWithOverlay />;
  }

  return (
    <ShopContext.Provider
      value={{
        activeShop: activeShop!,
        setActiveShop,
        shop: shop.data.data,
      }}
    >
      {children}
      {shop.isLoading && <LoaderWithOverlay />}
    </ShopContext.Provider>
  );
};
