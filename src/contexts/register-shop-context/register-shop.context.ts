import { IShopForm } from "@/modules/moderator/shops/utils";
import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

interface IRegisterShopContext {
  form: UseFormReturn<IShopForm>;
  handleSubmitForm: (data: IShopForm) => void;
  isPending: boolean;
}

export const RegisterShopContext = createContext<IRegisterShopContext | null>(
  null
);

export const useRegisterShopContext = () => {
  const context = useContext(RegisterShopContext);
  if (!context) {
    throw new Error(
      "useRegisterShopContext must be used within a RegisterShopContext"
    );
  }
  return context;
};
