import { useUserContext } from "@/contexts/user-context/user.context";
import { UserRoles } from "@/lib/enums";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  children?: ReactNode;
  roles: UserRoles[];
}

export const ProtectedRoute = ({ roles, children }: IProps) => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const hasAccessToPage = roles.some((role) => user.roles.includes(role));

  console.log({ hasAccessToPage });

  if (!hasAccessToPage) {
    return <Navigate to="/not-found" />;
  }

  return children;
};
