import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "@/lib/interfaces/user.interface";
import dayjs from "dayjs";
import { userRolesTranslations } from "@/lib/enums";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export const userColumns: ColumnDef<IUser>[] = [
  {
    header: "Ism",
    accessorKey: "full_name",
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => {
      return <div>{row.original.email ?? "---"}</div>;
    },
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
    cell: ({ row }) => {
      return (
        <div>
          <Button variant="outline" size="icon" asChild>
            <NavLink to={`/moderator/users/${row.original._id}/edit`}>
              <EditIcon className="w-4 h-4" />
            </NavLink>
          </Button>
        </div>
      );
    },
  },
];
