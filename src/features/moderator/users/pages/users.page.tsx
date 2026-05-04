import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Button } from "@/components/ui/button/button";
import { NavLink } from "react-router-dom";
import { useQueryParams } from "@/hooks";
import { DataTable } from "@/components/data-table/data-table";
import { getUsersInfiniteQueryFn } from "@/api/queries";
import { IUser } from "@/lib/interfaces/user.interface";
import { userColumns } from "../components/user-table/user-table-columns";
import { UserTableFilters } from "../components/user-table/user-table-filters";

export const UsersPage = () => {
  const { getQueryParams, setQueryParams } = useQueryParams();
  const filters = getQueryParams();

  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["users", filters],
    queryFn: ({ pageParam }) =>
      getUsersInfiniteQueryFn(pageParam as number, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.paginationInfo.hasNextPage
        ? lastPage.paginationInfo.currentPage + 1
        : undefined,
  });

  const allUsers: IUser[] = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Foydalanuvchilar</h1>
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
          data={allUsers}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={fetchNextPage}
        />
      </div>
    </div>
  );
};

export default UsersPage;
