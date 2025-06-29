import { getAllShopsQueryFn } from "@/api/queries/shops.query";
import { useQuery } from "@tanstack/react-query";
import { shopColumns } from "../components/shop-table/shops-table-columns";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ShopTableFilters } from "../components/shop-table/shop-table-filters";
import { useQueryParams } from "@/hooks";
import { DataTable } from "@/components/dashboard/data-table";

export const ShopsPage = () => {
  const { getQueryParams, setQueryParams } = useQueryParams();

  const { page, limit } = getQueryParams();

  const filter = {
    page: page ?? 1,
    limit: limit ?? 10,
    ...getQueryParams(),
  };

  const { data, isLoading } = useQuery({
    queryKey: ["shops", filter],
    queryFn: () => getAllShopsQueryFn(filter),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mijozlar</h1>
        <Button asChild>
          <NavLink to="/dashboard/shops/create">Mijoz qo'shish</NavLink>
        </Button>
      </div>
      <ShopTableFilters
        setQueryParams={setQueryParams}
        getQueryParams={getQueryParams}
      />
      <div>
        <DataTable
          columns={shopColumns}
          data={data?.data ?? []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ShopsPage;
