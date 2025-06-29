import { ColumnDef } from "@tanstack/react-table";
import { IPlan } from "../../utils/plan.interface";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export const plansTableColumns: ColumnDef<IPlan>[] = [
  {
    accessorKey: "name",
    header: "Nomi",
  },
  {
    accessorKey: "description",
    header: "Tavsifi",
  },
  {
    accessorKey: "price",
    header: "Narxi",
    cell: ({ row }) => {
      return <div>{row.original.price} so'm</div>;
    },
  },
  {
    accessorKey: "products.max",
    header: "Maximal productlar",
    size: 200,
    cell: ({ row }) => {
      return (
        <div>
          {row.original.products.max > 0
            ? row.original.products.max
            : "Cheksiz"}
        </div>
      );
    },
  },
  {
    accessorKey: "categories.max",
    header: "Maximal kategoriyalar",
    size: 200,
    cell: ({ row }) => {
      return (
        <div>
          {row.original.categories.max > 0
            ? row.original.categories.max
            : "Cheksiz"}
        </div>
      );
    },
  },
  {
    accessorKey: "orders.max",
    header: "Maximal buyurtmalar",
    size: 200,
    cell: ({ row }) => {
      return (
        <div>
          {row.original.orders.max > 0 ? row.original.orders.max : "Cheksiz"}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Yaratilgan vaqt",
    cell: ({ row }) => {
      return (
        <div>{dayjs(row.original.createdAt).format("DD.MM.YYYY HH:mm")}</div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Yangilangan vaqt",
    cell: ({ row }) => {
      return (
        <div>{dayjs(row.original.updatedAt).format("DD.MM.YYYY HH:mm")}</div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Amallar",
    size: 100,
    cell: ({ row }) => {
      return (
        <div>
          <Button variant="outline" size="icon" asChild>
            <NavLink to={`/dashboard/plans/${row.original._id}/edit`}>
              <EditIcon />
            </NavLink>
          </Button>
        </div>
      );
    },
  },
];
