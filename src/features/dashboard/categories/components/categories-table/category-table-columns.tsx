import { ColumnDef } from "@tanstack/react-table";
import { ICategory } from "../../utils/category.interface";
import { StatusChangeSwitch } from "@/components/moderator/forms/change-status-switch";
import { ChangePopularStatus } from "../category-form/change-popular-status";
import { EditCategory } from "../category-form/edit-category";
import { TFunction } from "i18next";
import { LanguageType } from "@/features/moderator/shops/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteCategory } from "../delete-category";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { TObject } from "@/hooks";

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

export const categoryTableColumns = (
  t: TFunction,
  lang: LanguageType,
  getQueryParams: () => TObject,
  setQueryParams: (params: TObject) => void
): ColumnDef<ICategory>[] => {
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
      accessorKey: "image",
      cell: ({ row }) => (
        <Avatar>
          <AvatarImage
            src={row.original.image}
            className="rounded-full object-cover"
          />
          <AvatarFallback>{row.original.name[lang].charAt(0)}</AvatarFallback>
        </Avatar>
      ),
    },
    {
      header: "table.columns.name",
      accessorKey: "name",
      cell: ({ row }) => <div>{row.original.name[lang]}</div>,
    },
    {
      id: "product_count",
      header: () => (
        <SortHeader
          label={t("table.columns.product_count")}
          field="product_count"
          sortBy={sortBy as string}
          sortOrder={sortOrder as string}
          onSort={onSort}
        />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.product_count} {t("common.quantity_suffix")}
        </div>
      ),
    },
    {
      header: "table.columns.status",
      accessorKey: "isActive",
      cell: ({ row }) => (
        <StatusChangeSwitch
          status={row.original.status}
          url={`/categories/${row.original.shop._id}/${row.original._id}/status`}
          invalidateQueryKey={["categories"]}
        />
      ),
    },
    {
      header: "table.columns.is_popular",
      accessorKey: "isPopular",
      cell: ({ row }) => (
        <ChangePopularStatus
          is_popular={row.original.is_popular}
          url={`/categories/${row.original.shop._id}/${row.original._id}/popular`}
          invalidateQueryKey={["categories"]}
        />
      ),
    },
    {
      header: "table.columns.actions",
      accessorKey: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <EditCategory category={row.original} />
          <DeleteCategory category={row.original} />
        </div>
      ),
    },
  ];
};
