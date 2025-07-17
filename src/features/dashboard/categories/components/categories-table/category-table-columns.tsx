import { ColumnDef } from "@tanstack/react-table";
import { ICategory } from "../utils/category.interface";
import { StatusChangeSwitch } from "@/components/moderator/forms/change-status-switch";
import { ChangePopularStatus } from "../category-form/change-popular-status";
import { EditCategory } from "../category-form/edit-category";
import { TFunction } from "i18next";
import { LanguageType } from "@/features/moderator/shops/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const categoryTableColumns = (
  t: TFunction,
  lang: LanguageType
): ColumnDef<ICategory>[] => [
  {
    header: "table.columns.image",
    size: 60,
    accessorKey: "image",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage
            src={row.original.image}
            className="rounded-full object-cover"
          />
          <AvatarFallback>{row.original.name[lang].charAt(0)}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    header: "table.columns.name",
    accessorKey: "name",
    cell: ({ row }) => {
      return <div>{row.original.name[lang]}</div>;
    },
  },
  {
    header: "table.columns.product_count",
    accessorKey: "product_count",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.product_count} {t("common.quantity_suffix")}
        </div>
      );
    },
  },
  {
    header: "table.columns.status",
    accessorKey: "isActive",
    cell: ({ row }) => {
      return (
        <StatusChangeSwitch
          status={row.original.status}
          url={`/categories/${row.original.shop._id}/${row.original._id}/status`}
          invalidateQueryKey={["categories"]}
        />
      );
    },
  },
  {
    header: "table.columns.is_popular",
    accessorKey: "isPopular",
    cell: ({ row }) => {
      return (
        <ChangePopularStatus
          is_popular={row.original.is_popular}
          url={`/categories/${row.original.shop._id}/${row.original._id}/popular`}
          invalidateQueryKey={["categories"]}
        />
      );
    },
  },
  {
    header: "table.columns.actions",
    accessorKey: "actions",
    cell: ({ row }) => {
      return <EditCategory category={row.original} />;
    },
  },
];
