import { dashboardRoutes } from "@/routes/dashboard/dashboard.routes";
import { UserRoles } from "./enums";

export const getDefaultPage = (roles: UserRoles[] = []) => {
  const path =
    dashboardRoutes.find((route) =>
      route.roles.some((role) => roles.includes(role))
    )?.path ?? dashboardRoutes[0].path;

  return `/dashboard${path}`;
};
