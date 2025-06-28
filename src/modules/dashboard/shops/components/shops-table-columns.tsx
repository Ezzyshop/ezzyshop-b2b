"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IShop, shopTypesTranslations } from "../utils";
import dayjs from "dayjs";

export const shopColumns: ColumnDef<IShop>[] = [
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
      return <div>{shopTypesTranslations[row.original.status]}</div>;
    },
  },
  {
    accessorKey: "owner.full_name",
    size: 120,
    header: "Egasi",
  },
  {
    accessorKey: "plan.name",
    size: 70,
    header: "Tarif",
  },
  {
    accessorKey: "currency.name",
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
          {dayjs(row.original.plan_start_date).format("DD.MM.YYYY HH:mm")}
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
          {dayjs(row.original.plan_end_date).format("DD.MM.YYYY HH:mm")}
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
    size: 120,
    accessorKey: "updatedAt",
    header: "Yangilangan sana",
    cell: ({ row }) => {
      return (
        <div>{dayjs(row.original.updatedAt).format("DD.MM.YYYY HH:mm")}</div>
      );
    },
  },
];
