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
import { useEffect, useRef } from "react";

interface IProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  paginationInfo?: IPaginationInfo;
  pinnedColumns?: { left?: string[]; right?: string[] };
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  isLoading = false,
  paginationInfo,
  pinnedColumns,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: IProps<TData, TValue>) => {
  const { t } = useTranslation();
  const sentinelRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!onLoadMore || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

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
      {onLoadMore && (
        <div
          ref={sentinelRef}
          className="py-2 text-center text-sm text-muted-foreground"
        >
          {isFetchingNextPage && <p>Yuklanmoqda...</p>}
          {!hasNextPage && data.length > 0 && !isLoading && (
            <p className="text-xs text-muted-foreground/60">Hammasi yuklandi</p>
          )}
        </div>
      )}
      {paginationInfo && <DataTablePagination data={paginationInfo} />}
    </>
  );
};
