"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IShop, ShopStatus, shopTypesTranslations } from "../../utils";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { BotIcon, CreditCardIcon, EditIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export const shopColumns: ColumnDef<IShop>[] = [
  {
    accessorKey: "owner.full_name",
    size: 120,
    header: "Biznes egasi",
  },
  {
    accessorKey: "name",
    header: "Biznes nomi",
    size: 160,
  },
  {
    accessorKey: "business_type",
    header: "Biznes turi",
    size: 120,
    cell: ({ row }) => {
      return <div>{shopTypesTranslations[row.original.business_type]}</div>;
    },
  },
  {
    accessorKey: "platform",
    header: "Platforma",
    size: 120,
    cell: ({ row }) => {
      return <div>{shopTypesTranslations[row.original.platform]}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 120,
    cell: ({ row }) => {
      return (
        <Badge
          variant={
            row.original.status === ShopStatus.Active ? "default" : "outline"
          }
        >
          {shopTypesTranslations[row.original.status]}
        </Badge>
      );
    },
  },

  {
    accessorKey: "plan.name",
    size: 70,
    header: "Tarif",
  },
  {
    accessorKey: "currency.symbol",
    size: 120,
    header: "Valyuta",
  },

  {
    accessorKey: "plan_start_date",
    size: 170,
    header: "Tarif boshlagan sana",
    cell: ({ row }) => {
      return (
        <div>
          {dayjs(row.original.subscription_info.plan_start_date).format(
            "DD.MM.YYYY HH:mm"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "plan_end_date",
    size: 170,
    header: "Tarif tugash vaqti",
    cell: ({ row }) => {
      return (
        <div>
          {dayjs(row.original.subscription_info.plan_end_date).format(
            "DD.MM.YYYY HH:mm"
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    size: 170,
    header: "Yaratilgan sana",
    cell: ({ row }) => {
      return (
        <div>{dayjs(row.original.createdAt).format("DD.MM.YYYY HH:mm")}</div>
      );
    },
  },

  {
    size: 140,
    accessorKey: "updatedAt",
    header: "Yangilangan sana",
    cell: ({ row }) => {
      return (
        <div>{dayjs(row.original.updatedAt).format("DD.MM.YYYY HH:mm")}</div>
      );
    },
  },
  {
    size: 120,
    accessorKey: "actions",
    header: "Amallar",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="icon">
            <NavLink to={`/moderator/shops/${row.original._id}/edit`}>
              <EditIcon className="w-4 h-4" />
            </NavLink>
          </Button>
          <Button asChild variant="outline" size="icon">
            <NavLink to={`/moderator/shops/${row.original._id}/telegram`}>
              <BotIcon className="w-4 h-4" />
            </NavLink>
          </Button>
          <Button asChild variant="outline" size="icon">
            <NavLink to={`/moderator/shops/${row.original._id}/plan`}>
              <CreditCardIcon className="w-4 h-4" />
            </NavLink>
          </Button>
        </div>
      );
    },
  },
];
