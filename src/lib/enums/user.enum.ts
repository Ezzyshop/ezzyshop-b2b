export enum UserRoles {
  SuperAdmin = "SUPER_ADMIN",
}

export const userRolesTranslations = {
  [UserRoles.SuperAdmin]: "Super Admin",
};

export enum UserStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Deleted = "DELETED",
}
