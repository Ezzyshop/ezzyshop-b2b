import { IUser } from "@/lib/interfaces";
import { createContext, useContext } from "react";

interface IUserContext {
  user: IUser;
}

export const UserContext = createContext<IUserContext | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
