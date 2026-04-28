import { createContext, useContext } from "react";
import { IRole, PermissionAction, PermissionResource } from "@/lib/types/permission.types";

interface IPermissionContext {
  isAdmin: boolean;
  role: IRole | null;
  isLoading: boolean;
  hasPermission: (resource: PermissionResource, action: PermissionAction) => boolean;
}

export const PermissionContext = createContext<IPermissionContext | null>(null);

export const usePermissionContext = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermissionContext must be used within PermissionContextProvider");
  }
  return context;
};
