import { PropsWithChildren, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useShopContext } from "../shop-context";
import { PermissionContext } from "./permission.context";
import { getMyRoleQueryFn } from "@/api/queries";
import { PermissionAction, PermissionResource } from "@/lib/types/permission.types";

export const PermissionContextProvider = ({ children }: PropsWithChildren) => {
  const { shop } = useShopContext();

  const { data, isLoading } = useQuery({
    queryKey: ["my-role", shop._id],
    queryFn: () => getMyRoleQueryFn(shop._id),
    enabled: Boolean(shop._id),
    staleTime: 5 * 60 * 1000,
  });

  const myRole = data?.data ?? null;
  const isAdmin = myRole?.isAdmin ?? false;
  const role = myRole?.role ?? null;

  const hasPermission = useMemo(
    () =>
      (resource: PermissionResource, action: PermissionAction): boolean => {
        if (isAdmin) return true;
        if (!role) return false;
        const perm = role.permissions.find((p) => p.resource === resource);
        return Boolean(perm && (perm.actions.includes(action) || perm.actions.includes("full")));
      },
    [isAdmin, role],
  );

  return (
    <PermissionContext.Provider value={{ isAdmin, role, isLoading, hasPermission }}>
      {children}
    </PermissionContext.Provider>
  );
};
