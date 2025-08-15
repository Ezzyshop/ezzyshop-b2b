import { ColumnDef } from "@tanstack/react-table";
import { TFunction } from "i18next";
import { IOrderResponse } from "../../utils/order.interface";
import { Badge } from "@/components/ui/badge";
import { orderStatusTranslations } from "../../utils/order.enum";
import { transactionStatusTranslations } from "../../utils/transaction.enum";
import { paymentMethodTypeLabels } from "@/features/dashboard/payment-methods/utils/payment-method.enum";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const orderTableColumns = (
  t: TFunction
): ColumnDef<IOrderResponse>[] => [
  {
    header: "table.columns.full_name",
    accessorKey: "name",
    cell: ({ row }) => {
      return <div>{row.original.customer_info.name}</div>;
    },
  },
  {
    header: "table.columns.phone",
    accessorKey: "phone",
    cell: ({ row }) => {
      return <div>{row.original.customer_info.phone}</div>;
    },
  },
  {
    header: "table.columns.product_quantity",
    accessorKey: "total_quantity",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.total_quantity} {t("common.quantity_suffix")}
        </div>
      );
    },
  },
  {
    header: "table.columns.total_price",
    accessorKey: "total_price",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.total_price.toLocaleString()}{" "}
          {row.original.transaction.currency.symbol}
        </div>
      );
    },
  },
  {
    header: "table.columns.type_delivery",
    accessorKey: "pickup_address",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.pickup_address
            ? t("table.columns.pickup")
            : t("table.columns.delivery")}
        </div>
      );
    },
  },
  {
    header: "table.columns.order_status",
    accessorKey: "status",
    cell: ({ row }) => {
      return (
        <Badge status={row.original.status}>
          {t(orderStatusTranslations[row.original.status])}
        </Badge>
      );
    },
  },
  {
    header: "table.columns.transaction_status",
    accessorKey: "transaction_status",
    cell: ({ row }) => {
      return (
        <Badge status={row.original.transaction.status}>
          {t(transactionStatusTranslations[row.original.transaction.status])}
        </Badge>
      );
    },
  },
  {
    header: "table.columns.payment_method",
    accessorKey: "payment_method",
    cell: ({ row }) => {
      return (
        <div>
          {t(paymentMethodTypeLabels[row.original.transaction.provider])}
        </div>
      );
    },
  },

  {
    header: "table.columns.created_at",
    accessorKey: "created_at",
    cell: ({ row }) => {
      return (
        <div>{dayjs(row.original.createdAt).format("DD.MM.YYYY HH:mm")}</div>
      );
    },
  },
  {
    header: "table.columns.actions",
    accessorKey: "actions",
    cell: ({ row }) => {
      return (
        <Button variant="outline" size="sm">
          <Link to={`/dashboard/orders/${row.original._id}`}>
            {t("common.details")}
          </Link>
        </Button>
      );
    },
  },
];
