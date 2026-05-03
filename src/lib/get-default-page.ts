import { UserRoles } from "./enums";

export const getDefaultPage = (roles: UserRoles[]): string => {
  if (roles.includes(UserRoles.SuperAdmin)) return "/moderator";
  return "/dashboard";
};
