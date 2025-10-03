import { DataTable } from "@/components/data-table/data-table";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useQueryParams } from "@/hooks";
import { StaffsTableFilters } from "../components/staffs-table/staffs-table-filter";
import { AddStaff } from "../components/staffs-form/add-staff";
import { getStaffsQueryFn } from "@/api/queries";
import { staffsTableColumns } from "../components/staffs-table/staffs-table-columns";

export function StaffsPage() {
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
    queryKey: ["staffs", shop._id, filter],
    queryFn: () => getStaffsQueryFn(shop._id, filter),
    enabled: Boolean(shop._id),
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("sidebar.dashboard.staffs")}</h1>
        <AddStaff />
      </div>
      <div className="space-y-4 md:space-y-6">
        <StaffsTableFilters
          setQueryParams={setQueryParams}
          getQueryParams={getQueryParams}
        />
        <DataTable
          columns={staffsTableColumns()}
          data={data?.data || []}
          isLoading={isLoading}
          paginationInfo={data?.paginationInfo}
        />
      </div>
    </div>
  );
}
export default StaffsPage;
