import { usePermissionContext } from "@/contexts/permission-context";
import { RouteAccess } from "@/lib/types/permission.types";
import { Spinner } from "@/components/ui/spinner";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  children: ReactNode;
  access: RouteAccess;
}

export const ProtectedRoute = ({ access, children }: IProps) => {
  const { isAdmin, hasPermission, isLoading } = usePermissionContext();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  let allowed = false;

  if (access.accessType === "admin-only") {
    allowed = isAdmin;
  } else if (access.accessType === "permission") {
    allowed = hasPermission(access.resource, access.action);
  } else {
    allowed = true;
  }

  if (!allowed) {
    return <Navigate to="/not-found" />;
  }

  return children;
};
