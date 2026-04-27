import { UserRoles } from "@/lib/enums";

export interface IStaffForm {
  full_name: string;
  phone: string;
  photo?: string;
  role: UserRoles.Staff | UserRoles.Admin;
}
