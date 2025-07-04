import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "../../utils/product.interface";
import { StatusChangeSwitch } from "@/components/moderator/forms/change-status-switch";
import dayjs from "dayjs";
import { EditProductButton } from "../product-form/edit-product";

export const productTableColumns: ColumnDef<IProduct>[] = [
  {
    header: "table.columns.image",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.images?.[0]}
          alt={row.original.name.uz}
          className="w-10 h-10 object-cover"
        />
      );
    },
  },
  {
    header: "table.columns.name",
    cell: ({ row }) => {
      return <div>{row.original.name.uz}</div>;
    },
  },
  {
    header: "table.columns.price",
    cell: ({ row }) => {
      return <div>{row.original.price.toLocaleString()}</div>;
    },
    accessorKey: "price",
  },
  {
    header: "table.columns.status",
    cell: ({ row }) => {
      return (
        <StatusChangeSwitch
          status={row.original.status}
          url={`/products/${row.original.shop._id}/${row.original._id}`}
          invalidateQueryKey={["products"]}
        />
      );
    },
  },
  {
    header: "table.columns.created_at",
    cell: ({ row }) => {
      return <div>{dayjs(row.original.createdAt).format("DD.MM.YYYY")}</div>;
    },
  },
  {
    header: "table.columns.actions",
    cell: ({ row }) => {
      return <EditProductButton productId={row.original._id} />;
    },
  },
];
