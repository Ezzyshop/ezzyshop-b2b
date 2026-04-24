import { getCategoriesInfiniteQueryFn } from "@/api/queries/categories.query";
import { reorderCategoriesMutationFn } from "@/api/mutations/categories.mutation";
import { DraggableDataTable } from "@/components/data-table/draggable-data-table";
import { useShopContext } from "@/contexts";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { categoryTableColumns } from "../components/categories-table/category-table-columns";
import { useQueryParams } from "@/hooks";
import { CategoryTableFilters } from "../components/categories-table/category-table-filter";
import { AddCategory } from "../components/category-form/add-category";
import { LanguageType } from "@/features/moderator/shops/utils";
import { ICategory } from "../utils/category.interface";
import { useMemo } from "react";

export function CategoriesPage() {
  const { t, i18n } = useTranslation();
  const { shop } = useShopContext();
  const { getQueryParams, setQueryParams } = useQueryParams();
  const queryClient = useQueryClient();

  const filters = getQueryParams();

  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["categories", shop._id, filters],
    queryFn: ({ pageParam }) =>
      getCategoriesInfiniteQueryFn(shop._id, pageParam as number, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.paginationInfo.hasNextPage
        ? lastPage.paginationInfo.currentPage + 1
        : undefined,
    enabled: Boolean(shop._id),
  });

  const allCategories: ICategory[] = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  const { mutate: reorder } = useMutation({
    mutationFn: (items: { id: string; order: number }[]) =>
      reorderCategoriesMutationFn(shop._id, items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", shop._id] });
    },
  });

  const handleReorder = (reordered: ICategory[]) => {
    const items = reordered.map((cat, index) => ({
      id: cat._id,
      order: index + 1,
    }));
    reorder(items);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {t("sidebar.dashboard.categories")}
        </h1>
        <AddCategory />
      </div>
      <div className="space-y-4 md:space-y-6">
        <CategoryTableFilters
          setQueryParams={setQueryParams}
          getQueryParams={getQueryParams}
        />
        <DraggableDataTable
          columns={categoryTableColumns(t, i18n.language as LanguageType)}
          data={allCategories}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={fetchNextPage}
          onReorder={handleReorder}
        />
      </div>
    </div>
  );
}
export default CategoriesPage;
