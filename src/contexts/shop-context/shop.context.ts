import { IUserShop } from "@/lib/interfaces";
import { IShop } from "@/features/moderator/shops/utils";
import { createContext, useContext } from "react";

interface IShopContext {
  activeShop: IUserShop;
  setActiveShop: (shop: IUserShop) => void;
  shop: IShop;
}

export const ShopContext = createContext<IShopContext | null>(null);

export const useShopContext = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShopContext must be used within ShopContextProvider");
  }

  return context;
};
