export enum UserRoles {
  SuperAdmin = "SUPER_ADMIN",
  Admin = "ADMIN",
  Staff = "STAFF",
  Basic = "BASIC",
}

export const userRolesTranslations = {
  [UserRoles.SuperAdmin]: "Super Admin",
  [UserRoles.Admin]: "Admin",
  [UserRoles.Staff]: "Staff",
  [UserRoles.Basic]: "Foydalanuvchi",
};
