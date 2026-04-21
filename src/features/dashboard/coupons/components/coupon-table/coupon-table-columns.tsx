import { ColumnDef } from "@tanstack/react-table";
import { ICoupon } from "../../utils/coupon.interface";
import { CouponDiscountType, CouponStatus } from "../../utils/coupon.enum";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TFunction } from "i18next";
import { EditCoupon } from "../coupon-form/edit-coupon";
import { DeleteCoupon } from "../coupon-form/delete-coupon";
import { Link } from "react-router-dom";
import { UsersIcon } from "lucide-react";

export const couponTableColumns = (t: TFunction): ColumnDef<ICoupon>[] => [
  {
    accessorKey: "code",
    header: t("dashboard.coupons.code"),
    cell: ({ row }) => (
      <Badge variant="outline" className="font-mono">
        {row.original.code}
      </Badge>
    ),
  },
  {
    id: "discount",
    header: t("dashboard.coupons.discount_value"),
    cell: ({ row }) => {
      const { discount_type, discount_value } = row.original;
      return discount_type === CouponDiscountType.Percentage
        ? `${discount_value}%`
        : `${discount_value.toLocaleString()} UZS`;
    },
  },
  {
    accessorKey: "min_order_price",
    header: t("dashboard.coupons.min_order_price"),
    size: 180,
    cell: ({ row }) => {
      const val = row.original.min_order_price;
      return val > 0 ? `${val.toLocaleString()} UZS` : "—";
    },
  },
  {
    id: "usage",
    header: t("dashboard.coupons.used_count"),
    cell: ({ row }) => {
      const { used_count, max_uses } = row.original;
      return `${used_count} / ${max_uses ?? "∞"}`;
    },
  },
  {
    accessorKey: "expires_at",
    header: t("dashboard.coupons.expires_at"),
    cell: ({ row }) => {
      const val = row.original.expires_at;
      return val ? new Date(val).toLocaleDateString() : t("dashboard.coupons.no_expiry");
    },
  },
  {
    accessorKey: "status",
    header: t("table.columns.status"),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === CouponStatus.Active ? "default" : "secondary"}>
          {status === CouponStatus.Active ? t("common.active") : t("common.inactive")}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: t("table.columns.actions"),
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link to={`/dashboard/coupons/${row.original._id}/usages`}>
            <UsersIcon className="h-4 w-4" />
          </Link>
        </Button>
        <EditCoupon coupon={row.original} />
        <DeleteCoupon coupon={row.original} />
      </div>
    ),
  },
];
