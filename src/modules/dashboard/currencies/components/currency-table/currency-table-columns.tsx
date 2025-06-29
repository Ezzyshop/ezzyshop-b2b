import { ColumnDef } from "@tanstack/react-table";
import { ICurrency } from "../../utils/currency.interface";
import dayjs from "dayjs";
import { StatusChangeSwitch } from "@/components/dashboard/forms/change-status-switch";

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
];
