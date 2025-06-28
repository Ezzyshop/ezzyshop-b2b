"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IShop } from "../utils";
import dayjs from "dayjs";

export const shopColumns: ColumnDef<IShop>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "business_type",
    header: "Biznes turi",
  },
  {
    accessorKey: "platform",
    header: "Platforma",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "owner.full_name",
    header: "Egasi",
  },
  {
    accessorKey: "plan.name",
    header: "Tarif",
  },
  {
    accessorKey: "currency.name",
    header: "Valyuta",
  },
  {
    accessorKey: "address.address",
    header: "Manzil",
  },
  {
    accessorKey: "createdAt",
    header: "Yaratilgan sana",
    cell: ({ row }) => {
      return (
        <div>{dayjs(row.original.createdAt).format("DD.MM.YYYY HH:mm")}</div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Yangilangan sana",
    cell: ({ row }) => {
      return (
        <div>{dayjs(row.original.updatedAt).format("DD.MM.YYYY HH:mm")}</div>
      );
    },
  },
];
