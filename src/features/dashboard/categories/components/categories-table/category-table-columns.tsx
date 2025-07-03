import { ColumnDef } from "@tanstack/react-table";
import { ICategory } from "../utils/category.interface";
import { StatusChangeSwitch } from "@/components/moderator/forms/change-status-switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChangePopularStatus } from "../category-form/change-popular-status";
import { EditCategory } from "../category-form/edit-category";

export const categoryTableColumns: ColumnDef<ICategory>[] = [
  {
    header: "table.columns.image",
    accessorKey: "image",
    size: 80,
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.original.image} />
          <AvatarFallback>{row.original.name.uz.charAt(0)}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    header: "table.columns.name",
    accessorKey: "name",
    size: 400,
    cell: ({ row }) => {
      return <div>{row.original.name.uz}</div>;
    },
  },
  {
    header: "table.columns.status",
    accessorKey: "isActive",
    size: 70,
    cell: ({ row }) => {
      return (
        <StatusChangeSwitch
          status={row.original.status}
          url={`/categories/${row.original.shop._id}/${row.original._id}/status`}
          invalidateQueryKey={["categories"]}
        />
      );
    },
  },
  {
    header: "table.columns.is_popular",
    accessorKey: "isPopular",
    size: 20,
    cell: ({ row }) => {
      return (
        <ChangePopularStatus
          is_popular={row.original.is_popular}
          url={`/categories/${row.original.shop._id}/${row.original._id}/popular`}
          invalidateQueryKey={["categories"]}
        />
      );
    },
  },
  {
    header: "table.columns.actions",
    accessorKey: "actions",
    size: 70,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 justify-end">
          <EditCategory category={row.original} />
        </div>
      );
    },
  },
];
