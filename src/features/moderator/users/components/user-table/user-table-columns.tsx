import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "@/lib/interfaces/user.interface";
import dayjs from "dayjs";
import { userRolesTranslations } from "@/lib/enums";
import { Button } from "@/components/ui/button/button";
import { EditIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ChangeUserPasswordDialog } from "../change-password/change-password-dialog";
import { DeleteUserDialog } from "../delete-user/delete-user-dialog";

export const userColumns: ColumnDef<IUser>[] = [
  {
    header: "Ism",
    accessorKey: "full_name",
  },
  {
    header: "Telefon raqam",
    accessorKey: "phone",
    cell: ({ row }) => {
      return <div>{row.original.phone ?? "---"}</div>;
    },
  },
  {
    accessorKey: "roles",
    header: "Rol",
    size: 120,
    cell: ({ row }) => {
      return (
        <div>
          {row.original.roles
            .map((role) => userRolesTranslations[role])
            .join(", ")}
        </div>
      );
    },
  },
  {
    header: "Yaratilgan vaqt",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return (
        <div>{dayjs(row.original.createdAt).format("DD.MM.YYYY HH:mm")}</div>
      );
    },
  },
  {
    header: "O'zgartirilgan vaqt",
    accessorKey: "updatedAt",
    cell: ({ row }) => {
      return (
        <div>{dayjs(row.original.updatedAt).format("DD.MM.YYYY HH:mm")}</div>
      );
    },
  },
  {
    header: "Amallar",
    accessorKey: "actions",
    size: 180,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild title="Tahrirlash">
            <NavLink to={`/moderator/users/${row.original._id}/edit`}>
              <EditIcon className="w-4 h-4" />
            </NavLink>
          </Button>
          <ChangeUserPasswordDialog
            userId={row.original._id}
            userName={row.original.full_name}
          />
          <DeleteUserDialog
            userId={row.original._id}
            userName={row.original.full_name}
          />
        </div>
      );
    },
  },
];
