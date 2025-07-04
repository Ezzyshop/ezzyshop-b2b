import { useTranslation } from "react-i18next";
import { AddProductButton } from "../components/product-form/add-products";

export const ProductsPage = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {t("sidebar.dashboard.products")}
        </h1>
        <AddProductButton />
      </div>
      {/* <div className="space-y-4 md:space-y-6">
        <CategoryTableFilters
          setQueryParams={setQueryParams}
          getQueryParams={getQueryParams}
        />
        <DataTable
          columns={categoryTableColumns}
          data={data?.data || []}
          isLoading={isLoading}
        />
      </div> */}
    </div>
  );
};

export default ProductsPage;