import { ColumnDef } from "@tanstack/react-table";
import { EditStaff } from "../staffs-form/edit-staff";
import { DeleteStaff } from "../staffs-form/delete-staff";
import { IUser } from "@/lib";
import { StaffRoleCell } from "./staff-role-cell";

export const staffsTableColumns = (): ColumnDef<IUser>[] => [
  {
    header: "table.columns.full_name",
    accessorKey: "name",
    cell: ({ row }) => <div>{row.original.full_name}</div>,
  },
  {
    header: "table.columns.phone",
    accessorKey: "phone",
    cell: ({ row }) => <div>{row.original.phone}</div>,
  },
  {
    header: "table.columns.role",
    accessorKey: "role",
    cell: ({ row }) => <StaffRoleCell staff={row.original} />,
  },
  {
    header: "table.columns.actions",
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <EditStaff staff={row.original} />
        <DeleteStaff staff={row.original} />
      </div>
    ),
  },
];
