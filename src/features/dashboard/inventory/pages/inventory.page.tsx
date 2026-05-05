import { useTranslation } from "react-i18next";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { getProductsInfiniteQueryFn } from "@/api/queries";
import { useShopContext } from "@/contexts";
import { useQueryParams } from "@/hooks";
import { LanguageType } from "@/features/moderator/shops/utils";
import { DataTable } from "@/components/data-table/data-table";
import { InventoryTableFilters } from "../components/inventory-table/inventory-table-filter";
import { inventoryTableColumns } from "../components/inventory-table/inventory-table-column";
import { useUpdateVariant } from "../utils/use-update-variant";
import { IInventoryRow } from "../utils/inventory.interface";

const LOW_STOCK_THRESHOLD = 10;

export const InventoryPage = () => {
  const { t, i18n } = useTranslation();
  const { shop } = useShopContext();
  const { getQueryParams, setQueryParams } = useQueryParams();
  const [savingKeys, setSavingKeys] = useState<Set<string>>(new Set());

  const filters = getQueryParams();

  const queryKey = useMemo(
    () => ["inventory-products", shop._id, filters] as const,
    [shop._id, filters]
  );

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) =>
        getProductsInfiniteQueryFn(shop._id, pageParam as number, filters),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.paginationInfo.hasNextPage
          ? lastPage.paginationInfo.currentPage + 1
          : undefined,
      enabled: Boolean(shop._id),
    });

  const rows: IInventoryRow[] = useMemo(() => {
    const products = data?.pages.flatMap((page) => page.data) ?? [];
    const stockFilter = filters.stock as string | undefined;

    const flat: IInventoryRow[] = [];
    for (const product of products) {
      if (!product.variants?.length) continue;
      for (const variant of product.variants) {
        if (stockFilter === "out" && variant.quantity > 0) continue;
        if (
          stockFilter === "low" &&
          (variant.quantity === 0 || variant.quantity >= LOW_STOCK_THRESHOLD)
        )
          continue;
        if (stockFilter === "in" && variant.quantity < LOW_STOCK_THRESHOLD)
          continue;
        flat.push({ product, variant });
      }
    }
    return flat;
  }, [data, filters.stock]);

  const { mutate: updateVariant } = useUpdateVariant(shop._id, queryKey);

  const markSaving = (key: string, on: boolean) => {
    setSavingKeys((prev) => {
      const next = new Set(prev);
      if (on) next.add(key);
      else next.delete(key);
      return next;
    });
  };

  const commit = useCallback(
    (
      row: IInventoryRow,
      field: "price" | "compare_at_price" | "quantity",
      value: number | null
    ) => {
      const cellKey = `${row.product._id}:${row.variant._id}:${field}`;
      markSaving(cellKey, true);
      updateVariant(
        {
          productId: row.product._id,
          variantId: row.variant._id,
          patch: { [field]: value },
        },
        {
          onSettled: () => markSaving(cellKey, false),
        }
      );
    },
    [updateVariant]
  );

  const columns = useMemo(
    () =>
      inventoryTableColumns({
        shop,
        lang: i18n.language as LanguageType,
        t,
        savingKeys,
        onCommitPrice: (row, v) => commit(row, "price", v),
        onCommitCompareAtPrice: (row, v) => commit(row, "compare_at_price", v),
        onCommitQuantity: (row, v) => commit(row, "quantity", v),
        lowStockThreshold: LOW_STOCK_THRESHOLD,
      }),
    [shop, i18n.language, t, savingKeys, commit]
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("sidebar.dashboard.inventory")}</h1>
      </div>
      <div className="space-y-4 md:space-y-6">
        <InventoryTableFilters
          setQueryParams={setQueryParams}
          getQueryParams={getQueryParams}
          shopId={shop._id}
        />
        <DataTable
          columns={columns}
          data={rows}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={fetchNextPage}
        />
      </div>
    </div>
  );
};

export default InventoryPage;
