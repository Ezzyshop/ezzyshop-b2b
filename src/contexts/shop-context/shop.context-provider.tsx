import { PropsWithChildren, useState } from "react";
import { useUserContext } from "../user-context";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getByShopByIdQueryFn } from "@/api/queries";
import { LoaderWithOverlay } from "@/components/loaders/global-loader";
import { ShopContext } from "./shop.context";
import { IUser } from "@/lib/interfaces";

export const ShopContextProvider = ({ children }: PropsWithChildren) => {
  const { user } = useUserContext();

  const hasUserShop = user.shops.length;
  const [activeShop, setActiveShop] = useState<IUser["shops"][number]>(
    user.shops[0]
  );

  const shop = useQuery({
    queryKey: ["shop", activeShop?._id],
    queryFn: () => getByShopByIdQueryFn(activeShop!._id),
    enabled: Boolean(activeShop?._id),
  });

  if (!hasUserShop || !activeShop) {
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
        activeShop,
        setActiveShop,
        shop: shop.data.data,
      }}
    >
      {children}
      {shop.isLoading && <LoaderWithOverlay />}
    </ShopContext.Provider>
  );
};
