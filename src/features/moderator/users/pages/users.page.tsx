import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button/button";
import { NavLink } from "react-router-dom";
import { useQueryParams } from "@/hooks";
import { DataTable } from "@/components/data-table/data-table";
import { getUsersQueryFn } from "@/api/queries";
import { userColumns } from "../components/user-table/user-table-columns";
import { UserTableFilters } from "../components/user-table/user-table-filters";

export const UsersPage = () => {
  const { getQueryParams, setQueryParams } = useQueryParams();

  const { page, limit } = getQueryParams();

  const filter = {
    page: page ?? 1,
    limit: limit ?? 10,
    ...getQueryParams(),
  };

  const { data, isLoading } = useQuery({
    queryKey: ["users", filter],
    queryFn: () => getUsersQueryFn(filter),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Foydalanuvchlar</h1>
        <Button asChild>
          <NavLink to="/moderator/users/create">Foydalanuvchi qo'shish</NavLink>
        </Button>
      </div>
      <UserTableFilters
        setQueryParams={setQueryParams}
        getQueryParams={getQueryParams}
      />
      <div>
        <DataTable
          columns={userColumns}
          data={data?.data ?? []}
          isLoading={isLoading}
          paginationInfo={data?.paginationInfo}
        />
      </div>
    </div>
  );
};

export default UsersPage;
