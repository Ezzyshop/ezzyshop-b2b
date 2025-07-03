import { ColumnDef } from "@tanstack/react-table";
import { ICurrency } from "../../utils/currency.interface";
import dayjs from "dayjs";
import { StatusChangeSwitch } from "@/components/moderator/forms/change-status-switch";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const currencyColumns: ColumnDef<ICurrency>[] = [
  {
    header: "Nomi",
    accessorKey: "name",
  },
  {
    header: "Simvoli",
    accessorKey: "symbol",
  },
  {
    header: "Holati",
    accessorKey: "status",
    cell: ({ row }) => {
      return (
        <StatusChangeSwitch
          status={row.original.status}
          url={`/currencies/${row.original._id}/status`}
          invalidateQueryKey={["currencies"]}
        />
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
    header: "Yangilangan vaqt",
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
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link to={`/moderator/currencies/${row.original._id}/edit`}>
              <EditIcon className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
