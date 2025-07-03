import { getCurrenciesQueryFn } from "@/api/queries";
import { DataTable } from "@/components/moderator/data-table";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { currencyColumns } from "../components/currency-table/currency-table-columns";

export const CurrenciesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["currencies"],
    queryFn: () => getCurrenciesQueryFn(),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Valyutalar</h1>
        <Button asChild>
          <NavLink to="/moderator/currencies/create">Valyuta qo'shish</NavLink>
        </Button>
      </div>

      <div>
        <DataTable
          columns={currencyColumns}
          data={data?.data ?? []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CurrenciesPage;
