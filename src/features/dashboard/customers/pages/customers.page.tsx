import { getCustomersQueryFn } from "@/api/queries";
import { DataTable } from "@/components/data-table/data-table";
import { useShopContext } from "@/contexts";
import { useQueryParams } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { CustomersTableFilter } from "../components/customers-table/customers-table-filter";
import { customersTableColumns } from "../components/customers-table/customers-table-columns";
import { useIsFeatureEnabled } from "@/hooks/use-plan-features";

export const CustomersPage = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const { getQueryParams, setQueryParams } = useQueryParams();
  const { page, limit } = getQueryParams();
  const isEnabled = useIsFeatureEnabled("customers");

  const filter = {
    page: page ?? 1,
    limit: limit ?? 20,
    ...getQueryParams(),
  };

  const { data, isLoading } = useQuery({
    queryKey: ["customers", shop._id, filter],
    queryFn: () => getCustomersQueryFn(shop._id, filter),
    enabled: Boolean(shop._id) && isEnabled,
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {t("sidebar.dashboard.customers")}
        </h1>
      </div>
      <div className="space-y-4 md:space-y-6">
        <CustomersTableFilter
          setQueryParams={setQueryParams}
          getQueryParams={getQueryParams}
        />
        <DataTable
          columns={customersTableColumns(t, getQueryParams, setQueryParams)}
          data={data?.data ?? []}
          isLoading={isLoading}
          paginationInfo={data?.paginationInfo}
        />
      </div>
    </div>
  );
};

export default CustomersPage;
