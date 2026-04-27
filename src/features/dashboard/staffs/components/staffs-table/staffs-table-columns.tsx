import { ColumnDef } from "@tanstack/react-table";
import { EditStaff } from "../staffs-form/edit-staff";
import { DeleteStaff } from "../staffs-form/delete-staff";
import { IUser } from "@/lib";
import { Badge } from "@/components/ui/badge";
import { UserRoles } from "@/lib/enums";
import { useShopContext } from "@/contexts";

const StaffRoleCell = ({ staff }: { staff: IUser }) => {
  const { shop } = useShopContext();
  const shopEntry = staff.shops?.find((s) => s.shop._id === shop._id);

  if (!shopEntry) return <span className="text-muted-foreground">—</span>;

  if (shopEntry.roles?.includes(UserRoles.Admin)) {
    return <Badge variant="default">Admin</Badge>;
  }

  if (shopEntry.customRole) {
    return <Badge variant="secondary">{shopEntry.customRole.name}</Badge>;
  }

  return <span className="text-muted-foreground">—</span>;
};

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
