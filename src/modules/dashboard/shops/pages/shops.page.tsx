import { getAllShopsQueryFn } from "@/api/queries/shops.query";
import { useQuery } from "@tanstack/react-query";
import { ShopsTable } from "../components/shops-table";
import { shopColumns } from "../components/shops-table-columns";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export const ShopsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["shops"],
    queryFn: () => getAllShopsQueryFn(),
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mijozlar</h1>
        <Button asChild>
          <NavLink to="/dashboard/shops/create">Mijoz qo'shish</NavLink>
        </Button>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ShopsTable columns={shopColumns} data={data?.data ?? []} />
        )}
      </div>
    </div>
  );
};

export default ShopsPage;
