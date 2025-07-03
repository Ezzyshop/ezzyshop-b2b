import { ColumnDef } from "@tanstack/react-table";
import { ICategory } from "../utils/category.interface";
import { StatusChangeSwitch } from "@/components/moderator/forms/change-status-switch";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const categoryTableColumns: ColumnDef<ICategory>[] = [
  {
    header: "Rasm",
    accessorKey: "image",
    size: 10,
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
    header: "Nomi",
    accessorKey: "name",
    size: 400,
    cell: ({ row }) => {
      return <div>{row.original.name.uz}</div>;
    },
  },
  {
    header: "Status",
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
    header: "Mashxurmi",
    accessorKey: "isPopular",
    size: 20,
    cell: ({ row }) => {
      return <div>{row.original.is_popular ? "Mashxur" : "Mashxur emas"}</div>;
    },
  },
  {
    header: "Amallar",
    accessorKey: "actions",
    size: 70,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 justify-end">
          <Button asChild variant="outline" size="icon">
            <Link to={`/categories/${row.original._id}/edit`}>
              <EditIcon />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
