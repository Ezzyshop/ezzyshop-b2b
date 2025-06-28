import { UserRoles } from "../enums";

export interface IUser {
  full_name: string;
  email: string | null;
  phone: string | null;
  password: string;
  photo: string | null;
  roles: UserRoles[];
  shops: [
    {
      _id: string;
      name: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
}
