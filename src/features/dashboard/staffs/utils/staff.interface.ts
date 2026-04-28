export interface IStaffForm {
  full_name: string;
  phone: string;
  photo?: string | null;
  isAdmin: boolean;
  roleId?: string;
}
