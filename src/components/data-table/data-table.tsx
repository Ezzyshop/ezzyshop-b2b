"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { DataTablePagination } from "./pagination";
import { IPaginationInfo } from "@/api/utils/axios.interface";

interface IProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  paginationInfo?: IPaginationInfo;
  pinnedColumns?: { left?: string[]; right?: string[] };
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  isLoading = false,
  paginationInfo,
  pinnedColumns,
}: IProps<TData, TValue>) => {
  const { t } = useTranslation();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    columnResizeDirection: "rtl",
    initialState: {
      columnPinning: {
        left: pinnedColumns?.left ?? [],
        right: pinnedColumns?.right ?? [],
      },
    },
  });

  return (
    <>
      <div className="rounded-md border shadow overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const pinned = header.column.getIsPinned();
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        minWidth: `${header.getSize()}px`,
                        maxWidth: `${header.getSize()}px`,
                      }}
                      className={cn(
                        pinned === "right" &&
                          "sticky right-0 z-10 bg-background border-l shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.08)]",
                        pinned === "left" &&
                          "sticky left-0 z-10 bg-background border-r shadow-[4px_0_6px_-2px_rgba(0,0,0,0.08)]"
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : typeof header.column.columnDef.header === "function"
                        ? flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        : t(header.column.columnDef.header as string)}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <p>Yuklanmoqda...</p>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const pinned = cell.column.getIsPinned();
                      return (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            pinned === "right" &&
                              "sticky right-0 z-10 bg-background border-l shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.08)]",
                            pinned === "left" &&
                              "sticky left-0 z-10 bg-background border-r shadow-[4px_0_6px_-2px_rgba(0,0,0,0.08)]"
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      {paginationInfo && <DataTablePagination data={paginationInfo} />}
    </>
  );
};
