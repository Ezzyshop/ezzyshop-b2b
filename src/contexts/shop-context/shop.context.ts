import { IUser } from "@/lib/interfaces";
import { IShop } from "@/modules/moderator/shops/utils";
import { createContext, useContext } from "react";

interface IShopContext {
  activeShop: IUser["shops"][number];
  setActiveShop: (shop: IUser["shops"][number]) => void;
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
