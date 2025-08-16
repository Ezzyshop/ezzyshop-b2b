import { getOrdersQueryFn } from "@/api/queries";
import { DataTable } from "@/components/data-table/data-table";
import { useShopContext } from "@/contexts";
import { useQueryParams } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { OrdersTableFilters } from "../components/orders-table/orders-table-filter";
import { orderTableColumns } from "../components/orders-table/orders-table-columns";
import { OrderPageAnalytics } from "../components/order-page/order-page-anaytics";

export const OrdersPage = () => {
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
    queryKey: ["orders", shop._id, filter],
    queryFn: () => getOrdersQueryFn(shop._id, filter),
    enabled: Boolean(shop._id),
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("sidebar.dashboard.orders")}</h1>
      </div>
      <div className="space-y-4 md:space-y-6">
        <OrderPageAnalytics />
        <OrdersTableFilters
          setQueryParams={setQueryParams}
          getQueryParams={getQueryParams}
        />
        <DataTable
          columns={orderTableColumns(t)}
          data={data?.data || []}
          isLoading={isLoading}
          paginationInfo={data?.paginationInfo}
        />
      </div>
    </div>
  );
};

export default OrdersPage;
