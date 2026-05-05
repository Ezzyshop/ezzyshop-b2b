import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IShop, LanguageType } from "@/features/moderator/shops/utils";
import { TFunction } from "i18next";
import { IInventoryRow } from "../../utils/inventory.interface";
import { EditableNumberCell } from "./editable-number-cell";
import { Badge } from "@/components/ui/badge/badge";

interface IBuildArgs {
  shop: IShop;
  lang: LanguageType;
  t: TFunction;
  savingKeys: Set<string>;
  onCommitPrice: (row: IInventoryRow, value: number | null) => void;
  onCommitCompareAtPrice: (row: IInventoryRow, value: number | null) => void;
  onCommitQuantity: (row: IInventoryRow, value: number | null) => void;
  lowStockThreshold: number;
}

const variantKey = (row: IInventoryRow) =>
  `${row.product._id}:${row.variant._id}`;

const formatAttributes = (attributes?: Record<string, string>) => {
  if (!attributes) return null;
  const entries = Object.entries(attributes).filter(([, v]) => v);
  if (entries.length === 0) return null;
  return entries.map(([k, v]) => `${k}: ${v}`).join(", ");
};

export const inventoryTableColumns = ({
  shop,
  lang,
  t,
  savingKeys,
  onCommitPrice,
  onCommitCompareAtPrice,
  onCommitQuantity,
  lowStockThreshold,
}: IBuildArgs): ColumnDef<IInventoryRow>[] => [
  {
    id: "image",
    header: "table.columns.image",
    size: 60,
    cell: ({ row }) => {
      const img =
        row.original.variant.images?.[0] ?? row.original.product.main_image;
      return (
        <Avatar>
          <AvatarImage src={img} className="rounded-full object-cover" />
          <AvatarFallback>
            {row.original.product.name[lang]?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    id: "name",
    header: "table.columns.name",
    size: 240,
    cell: ({ row }) => {
      const attrs = formatAttributes(row.original.variant.attributes);
      return (
        <div className="space-y-0.5">
          <div className="font-medium">{row.original.product.name[lang]}</div>
          {attrs && (
            <div className="text-xs text-muted-foreground">{attrs}</div>
          )}
        </div>
      );
    },
  },

  {
    id: "price",
    header: "table.columns.price",
    size: 160,
    cell: ({ row }) => {
      const key = variantKey(row.original);
      return (
        <EditableNumberCell
          value={row.original.variant.price}
          onCommit={(v) => v !== null && onCommitPrice(row.original, v)}
          isSaving={savingKeys.has(`${key}:price`)}
          suffix={shop.currency.symbol}
          min={0}
          integer
        />
      );
    },
  },
  {
    id: "compare_at_price",
    header: "inventory.columns.compare_at_price",
    size: 170,
    cell: ({ row }) => {
      const key = variantKey(row.original);
      return (
        <EditableNumberCell
          value={row.original.variant.compare_at_price}
          onCommit={(v) => onCommitCompareAtPrice(row.original, v)}
          isSaving={savingKeys.has(`${key}:compare_at_price`)}
          suffix={shop.currency.symbol}
          allowNull
          min={0}
          integer
        />
      );
    },
  },
  {
    id: "quantity",
    header: "table.columns.product_quantity",
    size: 120,
    cell: ({ row }) => {
      const key = variantKey(row.original);
      return (
        <EditableNumberCell
          value={row.original.variant.quantity}
          onCommit={(v) => v !== null && onCommitQuantity(row.original, v)}
          isSaving={savingKeys.has(`${key}:quantity`)}
          min={0}
          integer
        />
      );
    },
  },
  {
    id: "stock_status",
    header: "inventory.columns.stock_status",
    size: 120,
    cell: ({ row }) => {
      const qty = row.original.variant.quantity;
      if (qty === 0) {
        return <Badge variant="destructive">{t("inventory.status.out")}</Badge>;
      }
      if (qty < lowStockThreshold) {
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-500">
            {t("inventory.status.low")}
          </Badge>
        );
      }
      return <Badge variant="secondary">{t("inventory.status.in")}</Badge>;
    },
  },
  {
    id: "sku",
    header: "inventory.columns.sku",
    size: 140,
    cell: ({ row }) => (
      <span className="text-xs font-mono text-muted-foreground">
        {row.original.variant.sku || "—"}
      </span>
    ),
  },
];
