import { UserRoles, UserStatus } from "../enums";

export interface IUser {
  _id: string;
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
      logo: string | null;
      plan: {
        _id: string;
        name: string;
      };
    }
  ];
  createdAt: string;
  updatedAt: string;
  status: UserStatus;
  __v: number;
}

export type IUserForm = Omit<
  IUser,
  "createdAt" | "updatedAt" | "_id" | "__v" | "shops"
> & { confirm_password: string };
