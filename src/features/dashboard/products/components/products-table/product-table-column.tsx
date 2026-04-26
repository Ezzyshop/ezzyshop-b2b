import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "../../utils/product.interface";
import { StatusChangeSwitch } from "@/components/moderator/forms/change-status-switch";
import dayjs from "dayjs";
import { EditProductButton } from "../product-form/edit-product";
import { IShop, LanguageType } from "@/features/moderator/shops/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteProduct } from "../delete-product";
import { ArrowDown, ArrowUp, ArrowUpDown, Star } from "lucide-react";
import { TObject } from "@/hooks";
import { TFunction } from "i18next";

const SortHeader = ({
  label,
  field,
  sortBy,
  sortOrder,
  onSort,
}: {
  label: string;
  field: string;
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

export const productTableColumns = (
  shop: IShop,
  lang: LanguageType,
  getQueryParams: () => TObject,
  setQueryParams: (params: TObject) => void,
  t: TFunction
): ColumnDef<IProduct>[] => {
  const { sortBy = "", sortOrder = "desc" } = getQueryParams();

  const onSort = (field: string) => {
    const current = getQueryParams();
    if (current.sortBy !== field) {
      setQueryParams({ ...current, sortBy: field, sortOrder: "desc" });
    } else if (current.sortOrder === "desc") {
      setQueryParams({ ...current, sortBy: field, sortOrder: "asc" });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sortBy: _sb, sortOrder: _so, ...rest } = current;
      setQueryParams(rest);
    }
  };

  return [
    {
      header: "table.columns.image",
      size: 60,
      cell: ({ row }) => (
        <Avatar>
          <AvatarImage
            src={row.original.main_image}
            className="rounded-full object-cover"
          />
          <AvatarFallback>{row.original.name[lang]?.charAt(0)}</AvatarFallback>
        </Avatar>
      ),
    },
    {
      header: "table.columns.name",
      cell: ({ row }) => <div>{row.original.name[lang]}</div>,
    },
    {
      id: "price",
      header: () => (
        <SortHeader
          label={t("table.columns.price")}
          field="price"
          sortBy={sortBy as string}
          sortOrder={sortOrder as string}
          onSort={onSort}
        />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.variants?.[0].price.toLocaleString()} {shop.currency.symbol}
        </div>
      ),
    },
    {
      id: "quantity",
      header: "table.columns.product_quantity",
      cell: ({ row }) => {
        const qty = row.original.variants?.reduce((sum, v) => sum + (v.quantity ?? 0), 0) ?? 0;
        const color =
          qty === 0 ? "text-red-500" : qty < 10 ? "text-yellow-500" : "text-foreground";
        return <div className={color}>{qty}</div>;
      },
    },
    {
      id: "status",
      header: () => (
        <SortHeader
          label={t("table.columns.status")}
          field="status"
          sortBy={sortBy as string}
          sortOrder={sortOrder as string}
          onSort={onSort}
        />
      ),
      cell: ({ row }) => (
        <StatusChangeSwitch
          status={row.original.status}
          url={`/products/${row.original.shop._id}/${row.original._id}`}
          invalidateQueryKey={["products"]}
        />
      ),
    },
    {
      id: "createdAt",
      header: () => (
        <SortHeader
          label={t("table.columns.created_at")}
          field="createdAt"
          sortBy={sortBy as string}
          sortOrder={sortOrder as string}
          onSort={onSort}
        />
      ),
      cell: ({ row }) => (
        <div>{dayjs(row.original.createdAt).format("DD.MM.YYYY")}</div>
      ),
    },
    {
      id: "avg_rating",
      header: () => (
        <SortHeader
          label={t("reviews.avg_rating")}
          field="avg_rating"
          sortBy={sortBy as string}
          sortOrder={sortOrder as string}
          onSort={onSort}
        />
      ),
      cell: ({ row }) => {
        const rating = row.original.avg_rating ?? 0;
        const count = row.original.review_count ?? 0;
        if (count === 0) return <span className="text-muted-foreground text-sm">—</span>;
        return (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({count})</span>
          </div>
        );
      },
    },
    {
      header: "table.columns.actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <EditProductButton product={row.original} />
          <DeleteProduct product={row.original} />
        </div>
      ),
    },
  ];
};
