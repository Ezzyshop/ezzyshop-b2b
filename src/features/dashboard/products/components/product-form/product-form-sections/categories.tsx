import { Card } from "@/components/ui/card";
import { IProductForm } from "../../../utils/product.interface";
import { UseFormReturn } from "react-hook-form";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategoriesInfiniteQueryFn } from "@/api/queries/categories.query";
import { useShopContext } from "@/contexts";
import { MultiSelect } from "@/components/ui/multi-select";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

interface IProps {
  form: UseFormReturn<IProductForm, unknown, IProductForm>;
}

export const ProductFormCategories = ({ form }: IProps) => {
  const { shop } = useShopContext();
  const { i18n, t } = useTranslation();

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["categories", shop._id, "product-form"],
      queryFn: ({ pageParam }) =>
        getCategoriesInfiniteQueryFn(shop._id, pageParam as number, {
          limit: 10,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.paginationInfo.hasNextPage
          ? lastPage.paginationInfo.currentPage + 1
          : undefined,
      enabled: Boolean(shop._id),
    });

  const categoriesOptions = useMemo(
    () =>
      (data?.pages.flatMap((page) => page.data) ?? []).map((category) => ({
        label: category.name[i18n.language as keyof typeof category.name],
        value: category._id,
      })),
    [data, i18n.language]
  );

  const addCategory = (values: string[]) => {
    form.setValue("categories", values);
  };

  if (isLoading) {
    return null;
  }

  const categories = form.watch("categories");

  return (
    <Card className="p-3 gap-2">
      <h3 className="text-lg font-semibold mb-2">
        {t("dashboard.products.categories")}
      </h3>

      <div className="space-y-4">
        <div className="flex gap-2">
          <MultiSelect
            placeholder={t("common.select_options")}
            options={categoriesOptions}
            onValueChange={addCategory}
            defaultValue={categories}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={() => fetchNextPage()}
          />
        </div>
      </div>
    </Card>
  );
};
