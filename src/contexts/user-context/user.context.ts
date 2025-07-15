import { IResponse } from "@/api/utils/axios.interface";
import { IUser } from "@/lib/interfaces";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { createContext, useContext } from "react";

interface IUserContext {
  user: IUser;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<IResponse<IUser>, Error>>;
}

export const UserContext = createContext<IUserContext | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
