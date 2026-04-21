import { getCouponUsagesQueryFn } from "@/api/queries";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import dayjs from "dayjs";

export function CouponUsagesPage() {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const { couponId } = useParams<{ couponId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["coupon-usages", shop._id, couponId],
    queryFn: () => getCouponUsagesQueryFn(shop._id, couponId!),
    enabled: Boolean(shop._id) && Boolean(couponId),
  });

  const usages = data?.data || [];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/dashboard/coupons">
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            {t("sidebar.dashboard.coupons")}
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.coupons.usages")}</CardTitle>
          <p className="text-sm text-muted-foreground">{t("dashboard.coupons.usages_description")}</p>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : usages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No usages yet</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("dashboard.coupons.usage_customer")}</TableHead>
                  <TableHead>{t("dashboard.coupons.usage_order")}</TableHead>
                  <TableHead>{t("dashboard.coupons.usage_discount")}</TableHead>
                  <TableHead>{t("dashboard.coupons.usage_date")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usages.map((usage) => (
                  <TableRow key={usage._id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{usage.user.full_name}</p>
                        <p className="text-sm text-muted-foreground">{usage.user.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                        <Link to={`/dashboard/orders/${usage.order._id}`}>
                          {usage.order._id.slice(-8).toUpperCase()}
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell className="text-green-600">
                      -{usage.discount_amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{dayjs(usage.createdAt).format("DD.MM.YYYY HH:mm")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CouponUsagesPage;
