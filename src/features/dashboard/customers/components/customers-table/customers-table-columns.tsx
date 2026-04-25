import { ColumnDef } from "@tanstack/react-table";
import { TFunction } from "i18next";
import { ICustomerResponse } from "../../utils/customer.interface";
import dayjs from "dayjs";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { TObject } from "@/hooks";

type SortableField = "total_orders" | "total_amount" | "registered_at" | "first_order_date";

const SortHeader = ({
  label,
  field,
  sortBy,
  sortOrder,
  onSort,
}: {
  label: string;
  field: SortableField;
  sortBy: string;
  sortOrder: string;
  onSort: (field: string) => void;
}) => {
  const isActive = sortBy === field;
  const Icon = isActive
    ? sortOrder === "asc"
      ? ArrowUp
      : ArrowDown
    : ArrowUpDown;

  return (
    <button
      className="flex items-center gap-1 hover:text-foreground transition-colors"
      onClick={() => onSort(field)}
    >
      {label}
      <Icon className={`h-4 w-4 ${isActive ? "opacity-100" : "opacity-40"}`} />
    </button>
  );
};

export const customersTableColumns = (
  t: TFunction,
  getQueryParams: () => TObject,
  setQueryParams: (params: TObject) => void
): ColumnDef<ICustomerResponse>[] => {
  const { sortBy = "first_order_date", sortOrder = "desc" } = getQueryParams();

  const onSort = (field: string) => {
    const current = getQueryParams();
    const newOrder =
      current.sortBy === field && current.sortOrder === "asc" ? "desc" : "asc";
    setQueryParams({ ...current, sortBy: field, sortOrder: newOrder, page: 1 });
  };

  return [
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
      header: () => (
        <SortHeader
          label={t("table.columns.total_orders")}
          field="total_orders"
          sortBy={sortBy as string}
          sortOrder={sortOrder as string}
          onSort={onSort}
        />
      ),
      accessorKey: "total_orders",
      cell: ({ row }) => <div>{row.original.total_orders}</div>,
    },
    {
      header: () => (
        <SortHeader
          label={t("table.columns.total_amount")}
          field="total_amount"
          sortBy={sortBy as string}
          sortOrder={sortOrder as string}
          onSort={onSort}
        />
      ),
      accessorKey: "total_amount",
      cell: ({ row }) => (
        <div>{row.original.total_amount.toLocaleString()}</div>
      ),
    },
    {
      header: () => (
        <SortHeader
          label={t("table.columns.registered_at")}
          field="registered_at"
          sortBy={sortBy as string}
          sortOrder={sortOrder as string}
          onSort={onSort}
        />
      ),
      accessorKey: "registered_at",
      cell: ({ row }) => (
        <div>{dayjs(row.original.registered_at).format("DD.MM.YYYY")}</div>
      ),
    },
    {
      header: () => (
        <SortHeader
          label={t("table.columns.first_order_date")}
          field="first_order_date"
          sortBy={sortBy as string}
          sortOrder={sortOrder as string}
          onSort={onSort}
        />
      ),
      accessorKey: "first_order_date",
      cell: ({ row }) => (
        <div>{dayjs(row.original.first_order_date).format("DD.MM.YYYY")}</div>
      ),
    },
  ];
};
