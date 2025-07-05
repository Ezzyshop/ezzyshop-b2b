import { useTranslation } from "react-i18next";
import { AddProductButton } from "../components/product-form/add-product";
import { getProductsQueryFn } from "@/api/queries";
import { useShopContext } from "@/contexts";
import { DataTable } from "@/components/moderator/data-table";
import { productTableColumns } from "../components/products-table/product-table-column";
import { useQuery } from "@tanstack/react-query";
import { useQueryParams } from "@/hooks";
import { ProductTableFilters } from "../components/products-table/product-table-filter";

export const ProductsPage = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const { getQueryParams, setQueryParams } = useQueryParams();
  const filters = {
    page: 1,
    limit: 10,
    ...getQueryParams(),
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products", shop._id, filters],
    queryFn: () => getProductsQueryFn(shop._id, filters),
    enabled: Boolean(shop._id),
  });

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
        />
        <DataTable
          columns={productTableColumns(shop)}
          data={data?.data || []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
