import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPlansQueryFn } from "@/api/queries";
import { plansTableColumns } from "../components/plan-table/plans-table-column";
import { DataTable } from "@/components/data-table";
import { IPlan } from "../utils/plan.interface";

export const PlansPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: () => getPlansQueryFn(),
  });
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tariflar</h1>
        <Button asChild>
          <NavLink to="/dashboard/plans/create">Tarif qo'shish</NavLink>
        </Button>
      </div>
      <div>
        <DataTable<IPlan, keyof IPlan>
          columns={plansTableColumns}
          data={data?.data ?? []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default PlansPage;
