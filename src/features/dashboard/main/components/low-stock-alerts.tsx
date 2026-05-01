import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AlertTriangle, Package, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useShopContext } from "@/contexts";
import { getLowStockQueryFn } from "@/api/queries/dashboard-stats.query";

export const LowStockAlerts = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();

  const { data: lowStockProducts = [], isLoading } = useQuery({
    queryKey: ["dashboard-stats", shop._id, "low-stock"],
    queryFn: () => getLowStockQueryFn(shop._id),
    enabled: !!shop?._id,
  });

  const getBadgeColor = (qty: number) => {
    if (qty === 0) return "bg-red-100 text-red-700 border-red-200";
    if (qty <= 3) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <CardTitle className="text-base font-semibold">
            {t("dashboard.main.low_stock")}
          </CardTitle>
          {!isLoading && lowStockProducts.length > 0 && (
            <Badge variant="secondary" className="text-xs h-5 px-1.5">
              {lowStockProducts.length}
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="sm" asChild className="gap-1 text-xs h-7">
          <Link to="/dashboard/products">
            {t("dashboard.main.view_all")}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="space-y-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-3">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-5 w-16" />
              </div>
            ))}
          </div>
        ) : lowStockProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2 text-sm text-muted-foreground">
            <Package className="h-8 w-8 text-muted-foreground/40" />
            {t("dashboard.main.no_low_stock")}
          </div>
        ) : (
          <div className="divide-y">
            {lowStockProducts.map((product) => {
              const name = product.name.uz || product.name.ru || product.name.en || "";
              return (
                <Link
                  key={product._id}
                  to={`/dashboard/products`}
                  className="flex items-center gap-3 px-6 py-3 hover:bg-muted/40 transition-colors"
                >
                  {product.main_image ? (
                    <img
                      src={product.main_image}
                      alt={name}
                      className="h-8 w-8 rounded object-cover shrink-0"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded bg-muted flex items-center justify-center shrink-0">
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  <span className="text-sm flex-1 min-w-0 truncate font-medium">{name}</span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full border shrink-0 ${getBadgeColor(product.minQty)}`}
                  >
                    {product.minQty} {t("dashboard.main.items_left")}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
