import { ColumnDef } from "@tanstack/react-table";
import { IPlan } from "../../utils/plan.interface";
import { PLAN_FEATURE_MAP } from "@/lib/plan-features.const";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button/button";
import { EditIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { StatusChangeSwitch } from "@/components/moderator/forms/change-status-switch";

const formatLimit = (limit: number) => (limit === -1 ? "Cheksiz" : limit.toLocaleString());

export const plansTableColumns: ColumnDef<IPlan>[] = [
  {
    accessorKey: "name",
    header: "Nomi",
  },
  {
    accessorKey: "description.uz",
    header: "Tavsifi",
  },
  {
    accessorKey: "order",
    header: "Tartib",
    size: 80,
  },
  {
    accessorKey: "subscriptions",
    header: "Mijozlar",
    size: 90,
    cell: ({ row }) => <div>{row.original.subscriptions}</div>,
  },
  {
    accessorKey: "price",
    header: "Oylik narx",
    cell: ({ row }) => <div>{row.original.price.toLocaleString()} so'm</div>,
  },
  {
    accessorKey: "annual_price",
    header: "Yillik narx",
    cell: ({ row }) => (
      <div>{row.original.annual_price.toLocaleString()} so'm</div>
    ),
  },
  {
    id: "features",
    header: "Xususiyatlar",
    cell: ({ row }) => {
      const features = row.original.features ?? {};
      const enabled = Object.entries(features).filter(([, v]) => v.enabled);
      if (enabled.length === 0) {
        return <span className="text-muted-foreground text-xs">—</span>;
      }
      return (
        <div className="flex flex-col gap-0.5">
          {enabled.map(([key, v]) => (
            <span key={key} className="text-xs whitespace-nowrap">
              {PLAN_FEATURE_MAP[key]?.label ?? key}:{" "}
              <span className="font-medium">{formatLimit(v.limit)}</span>
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Holati",
    cell: ({ row }) => (
      <StatusChangeSwitch
        status={row.original.status}
        url={`/plans/${row.original._id}/status`}
        invalidateQueryKey={["plans"]}
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Yaratilgan",
    cell: ({ row }) => (
      <div>{dayjs(row.original.createdAt).format("DD.MM.YYYY HH:mm")}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Yangilangan",
    cell: ({ row }) => (
      <div>{dayjs(row.original.updatedAt).format("DD.MM.YYYY HH:mm")}</div>
    ),
  },
  {
    id: "actions",
    header: "Amallar",
    size: 80,
    cell: ({ row }) => (
      <Button variant="outline" size="icon" asChild>
        <NavLink to={`/moderator/plans/${row.original._id}/edit`}>
          <EditIcon />
        </NavLink>
      </Button>
    ),
  },
];
