import { getCategoriesQueryFn } from "@/api/queries/categories.query";
import { DataTable } from "@/components/moderator/data-table";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { categoryTableColumns } from "../components/categories-table/category-table-columns";
import { useQueryParams } from "@/hooks";
import { CategoryTableFilters } from "../components/categories-table/category-table-filter";
import { AddCategory } from "../components/category-form/add-category";

export function CategoriesPage() {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const { getQueryParams, setQueryParams } = useQueryParams();
  const { page, limit } = getQueryParams();

  const filter = {
    page: page ?? 1,
    limit: limit ?? 10,
    ...getQueryParams(),
  };

  const { data, isLoading } = useQuery({
    queryKey: ["categories", shop?._id, filter],
    queryFn: () => getCategoriesQueryFn(shop._id!, filter),
    enabled: Boolean(shop?._id),
  });

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
        <DataTable
          columns={categoryTableColumns}
          data={data?.data || []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
export default CategoriesPage;
