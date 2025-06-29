import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "@/lib/interfaces/user.interface";
import dayjs from "dayjs";
import { userRolesTranslations } from "@/lib/enums";

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
  },
];
