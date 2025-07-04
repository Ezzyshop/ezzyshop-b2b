import { useTranslation } from "react-i18next";
import { AddProductButton } from "../components/product-form/add-product";
import { getProductsQueryFn } from "@/api/queries";
import { useShopContext } from "@/contexts";
import { DataTable } from "@/components/moderator/data-table";
import { productTableColumns } from "../components/products-table/product-table-column";
import { useQuery } from "@tanstack/react-query";

export const ProductsPage = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();

  const { data, isLoading } = useQuery({
    queryKey: ["products", shop?._id],
    queryFn: () => getProductsQueryFn(shop?._id),
    enabled: !!shop?._id,
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
        {/* <CategoryTableFilters
          setQueryParams={setQueryParams}
          getQueryParams={getQueryParams}
        /> */}
        <DataTable
          columns={productTableColumns}
          data={data?.data || []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
