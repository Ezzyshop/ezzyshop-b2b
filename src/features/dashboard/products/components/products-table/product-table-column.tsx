import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "../../utils/product.interface";
import { StatusChangeSwitch } from "@/components/moderator/forms/change-status-switch";
import dayjs from "dayjs";
import { EditProductButton } from "../product-form/edit-product";
import { IShop } from "@/features/moderator/shops/utils";
import { LanguageType } from "@/features/moderator/shops/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteProduct } from "../delete-product";

export const productTableColumns = (
  shop: IShop,
  lang: LanguageType
): ColumnDef<IProduct>[] => [
  {
    header: "table.columns.image",
    size: 60,
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage
            src={row.original.images?.[0]}
            className="rounded-full object-cover"
          />
          <AvatarFallback>{row.original.name[lang]?.charAt(0)}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    header: "table.columns.name",
    cell: ({ row }) => {
      return <div>{row.original.name[lang]}</div>;
    },
  },
  {
    header: "table.columns.price",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.price.toLocaleString()} {shop.currency.symbol}
        </div>
      );
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
      return (
        <div className="flex items-center gap-2">
          <EditProductButton product={row.original} />
          <DeleteProduct product={row.original} />
        </div>
      );
    },
  },
];
