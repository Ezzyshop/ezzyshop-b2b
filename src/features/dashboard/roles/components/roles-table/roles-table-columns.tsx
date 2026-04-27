import { ColumnDef } from "@tanstack/react-table";
import { IRole } from "@/lib/types/permission.types";
import { EditRole } from "../role-form/edit-role";
import { DeleteRole } from "../role-form/delete-role";
import { Badge } from "@/components/ui/badge";

export const rolesTableColumns = (): ColumnDef<IRole>[] => [
  {
    header: "table.columns.name",
    accessorKey: "name",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    header: "table.columns.permissions",
    accessorKey: "permissions",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.permissions.slice(0, 4).map((p) => (
          <Badge key={p.resource} variant="secondary" className="text-xs">
            {p.resource.replace(/_/g, " ")}
          </Badge>
        ))}
        {row.original.permissions.length > 4 && (
          <Badge variant="outline" className="text-xs">
            +{row.original.permissions.length - 4}
          </Badge>
        )}
      </div>
    ),
  },
  {
    header: "table.columns.actions",
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <EditRole role={row.original} />
        <DeleteRole role={row.original} />
      </div>
    ),
  },
];
