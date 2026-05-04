import { getLinkClicksOverviewQueryFn, IShopLinkClickItem } from "@/api/queries/analytics.query";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MousePointerClickIcon } from "lucide-react";

const columns: ColumnDef<IShopLinkClickItem>[] = [
  {
    header: "#",
    size: 50,
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.index + 1}</span>
    ),
  },
  {
    accessorKey: "shop_name",
    header: "Do'kon nomi",
  },
  {
    accessorKey: "owner_name",
    header: "Egasi",
  },
  {
    accessorKey: "total_clicks",
    header: "Kliklar soni",
    size: 140,
    cell: ({ row }) => (
      <span className="font-semibold tabular-nums">
        {row.original.total_clicks.toLocaleString()}
      </span>
    ),
  },
];

export const StatisticsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["link-clicks-overview"],
    queryFn: getLinkClicksOverviewQueryFn,
  });

  const overview = data?.data;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Statistika</h1>

      <Card className="w-fit min-w-[200px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Jami kliklar
          </CardTitle>
          <MousePointerClickIcon className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold tabular-nums">
            {overview?.total_clicks.toLocaleString() ?? "—"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Ezzyshop havolasiga bosilgan marta
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold mb-3">Do'konlar bo'yicha</h2>
        <DataTable
          columns={columns}
          data={overview?.shops ?? []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default StatisticsPage;
