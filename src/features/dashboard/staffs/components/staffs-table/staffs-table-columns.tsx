import { ColumnDef } from "@tanstack/react-table";
import { EditStaff } from "../staffs-form/edit-staff";
import { DeleteStaff } from "../staffs-form/delete-staff";
import { IUser } from "@/lib";

export const staffsTableColumns = (): ColumnDef<IUser>[] => [
  {
    header: "table.columns.full_name",
    accessorKey: "name",
    cell: ({ row }) => {
      return <div>{row.original.full_name}</div>;
    },
  },
  {
    header: "table.columns.phone",
    accessorKey: "phone",
    cell: ({ row }) => {
      return <div>{row.original.phone}</div>;
    },
  },
  {
    header: "table.columns.actions",
    accessorKey: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <EditStaff staff={row.original} />
          <DeleteStaff staff={row.original} />
        </div>
      );
    },
  },
];
