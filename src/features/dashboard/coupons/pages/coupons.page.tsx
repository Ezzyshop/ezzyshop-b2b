import { getCouponsQueryFn } from "@/api/queries";
import { DataTable } from "@/components/data-table/data-table";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { couponTableColumns } from "../components/coupon-table/coupon-table-columns";
import { AddCoupon } from "../components/coupon-form/add-coupon";

export function CouponsPage() {
  const { t } = useTranslation();
  const { shop } = useShopContext();

  const { data, isLoading } = useQuery({
    queryKey: ["coupons", shop._id],
    queryFn: () => getCouponsQueryFn(shop._id),
    enabled: Boolean(shop._id),
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("sidebar.dashboard.coupons")}</h1>
        <AddCoupon />
      </div>
      <DataTable
        columns={couponTableColumns(t)}
        data={data?.data || []}
        isLoading={isLoading}
      />
    </div>
  );
}

export default CouponsPage;
