import { getAllShopsQueryFn } from "@/api/queries/shops.query";
import { useQuery } from "@tanstack/react-query";
import { shopColumns } from "../components/shop-table/shops-table-columns";
import { Button } from "@/components/ui/button/button";
import { NavLink } from "react-router-dom";
import { ShopTableFilters } from "../components/shop-table/shop-table-filters";
import { useQueryParams } from "@/hooks";
import { DataTable } from "@/components/data-table/data-table";
import { YemakImportButton } from "../components/yemak-import-modal";
import { YandexImportButton } from "../components/yandex-import-modal";
import { ShopsBoardView } from "../components/shop-board/shops-board-view";
import { LayoutGridIcon, TableIcon } from "lucide-react";

type ShopsView = "table" | "board";

export const ShopsPage = () => {
  const { getQueryParams, setQueryParams } = useQueryParams();

  const { page, limit, view, ...rest } = getQueryParams();
  const activeView: ShopsView = view === "board" ? "board" : "table";

  const filter = {
    page: page ?? 1,
    limit: limit ?? 10,
    ...rest,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["shops", filter],
    queryFn: () => getAllShopsQueryFn(filter),
    enabled: activeView === "table",
  });

  const setView = (next: ShopsView) => {
    const params = getQueryParams();
    setQueryParams({ ...params, view: next === "table" ? undefined : next });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mijozlar</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border bg-background p-0.5">
            <Button
              type="button"
              size="sm"
              variant={activeView === "table" ? "default" : "ghost"}
              onClick={() => setView("table")}
            >
              <TableIcon className="w-4 h-4 mr-1" />
              Jadval
            </Button>
            <Button
              type="button"
              size="sm"
              variant={activeView === "board" ? "default" : "ghost"}
              onClick={() => setView("board")}
            >
              <LayoutGridIcon className="w-4 h-4 mr-1" />
              Doska
            </Button>
          </div>
          <YemakImportButton />
          <YandexImportButton />
          <Button asChild>
            <NavLink to="/moderator/shops/create">Mijoz qo'shish</NavLink>
          </Button>
        </div>
      </div>
      <ShopTableFilters
        setQueryParams={setQueryParams}
        getQueryParams={getQueryParams}
      />
      {activeView === "table" ? (
        <div>
          <DataTable
            columns={shopColumns}
            data={data?.data ?? []}
            isLoading={isLoading}
            paginationInfo={data?.paginationInfo}
            pinnedColumns={{ right: ["actions"] }}
          />
        </div>
      ) : (
        <ShopsBoardView />
      )}
    </div>
  );
};

export default ShopsPage;
