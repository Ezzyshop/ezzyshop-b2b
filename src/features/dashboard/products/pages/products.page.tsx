import { useTranslation } from "react-i18next";
import { AddProductButton } from "../components/product-form/add-product";
import { getProductsInfiniteQueryFn } from "@/api/queries";
import { reorderProductsMutationFn } from "@/api/mutations";
import { useShopContext } from "@/contexts";
import { DraggableDataTable } from "@/components/data-table/draggable-data-table";
import { productTableColumns } from "../components/products-table/product-table-column";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useQueryParams } from "@/hooks";
import { ProductTableFilters } from "../components/products-table/product-table-filter";
import { LanguageType } from "@/features/moderator/shops/utils";
import { IProduct } from "../utils/product.interface";
import { useMemo } from "react";

export const ProductsPage = () => {
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
    queryKey: ["products", shop._id, filters],
    queryFn: ({ pageParam }) =>
      getProductsInfiniteQueryFn(shop._id, pageParam as number, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.paginationInfo.hasNextPage
        ? lastPage.paginationInfo.currentPage + 1
        : undefined,
    enabled: Boolean(shop._id),
  });

  const allProducts: IProduct[] = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  const { mutate: reorder } = useMutation({
    mutationFn: (items: { id: string; order: number }[]) =>
      reorderProductsMutationFn(shop._id, items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", shop._id] });
    },
  });

  const handleReorder = (reordered: IProduct[]) => {
    const items = reordered.map((product, index) => ({
      id: product._id,
      order: index + 1,
    }));
    reorder(items);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {t("sidebar.dashboard.products")}
        </h1>
        <AddProductButton />
      </div>
      <div className="space-y-4 md:space-y-6">
        <ProductTableFilters
          setQueryParams={setQueryParams}
          getQueryParams={getQueryParams}
          shopId={shop._id}
        />
        <DraggableDataTable
          columns={productTableColumns(shop, i18n.language as LanguageType, getQueryParams, setQueryParams, t)}
          data={allProducts}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={fetchNextPage}
          onReorder={handleReorder}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
