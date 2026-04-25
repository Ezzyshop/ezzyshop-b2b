import { ColumnDef } from "@tanstack/react-table";
import { TFunction } from "i18next";
import { ICustomerResponse } from "../../utils/customer.interface";
import dayjs from "dayjs";

export const customersTableColumns = (
  t: TFunction
): ColumnDef<ICustomerResponse>[] => [
  {
    header: "table.columns.full_name",
    accessorKey: "full_name",
    cell: ({ row }) => <div>{row.original.full_name}</div>,
  },
  {
    header: "table.columns.phone",
    accessorKey: "phone",
    cell: ({ row }) => <div>{row.original.phone ?? "—"}</div>,
  },
  {
    header: "table.columns.total_orders",
    accessorKey: "total_orders",
    cell: ({ row }) => <div>{row.original.total_orders}</div>,
  },
  {
    header: "table.columns.total_amount",
    accessorKey: "total_amount",
    cell: ({ row }) => (
      <div>{row.original.total_amount.toLocaleString()}</div>
    ),
  },
  {
    header: "table.columns.registered_at",
    accessorKey: "registered_at",
    cell: ({ row }) => (
      <div>{dayjs(row.original.registered_at).format("DD.MM.YYYY")}</div>
    ),
  },
  {
    header: "table.columns.first_order_date",
    accessorKey: "first_order_date",
    cell: ({ row }) => (
      <div>{dayjs(row.original.first_order_date).format("DD.MM.YYYY")}</div>
    ),
  },
];
