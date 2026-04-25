"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

interface DraggableRowProps<TData extends { _id: string }> {
  row: ReturnType<
    ReturnType<typeof useReactTable<TData>>["getRowModel"]
  >["rows"][number];
}

function DraggableRow<TData extends { _id: string }>({
  row,
}: DraggableRowProps<TData>) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: (row.original as { _id: string })._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      data-state={row.getIsSelected() && "selected"}
    >
      <TableCell className="w-10 cursor-grab active:cursor-grabbing" {...attributes} {...listeners}>
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </TableCell>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

interface IDraggableDataTableProps<TData extends { _id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
  onReorder?: (items: TData[]) => void;
}

export const DraggableDataTable = <
  TData extends { _id: string },
  TValue,
>({
  columns,
  data,
  isLoading = false,
  hasNextPage = false,
  isFetchingNextPage = false,
  onLoadMore,
  onReorder,
}: IDraggableDataTableProps<TData, TValue>) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<TData[]>(data);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setItems(data);
  }, [data]);

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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item._id === active.id);
    const newIndex = items.findIndex((item) => item._id === over.id);
    const reordered = arrayMove(items, oldIndex, newIndex);

    setItems(reordered);
    onReorder?.(reordered);
  };

  return (
    <>
      <div className="rounded-md border shadow">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <TableHead className="w-10" />
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : typeof header.column.columnDef.header === "function"
                        ? flexRender(header.column.columnDef.header, header.getContext())
                        : t(header.column.columnDef.header as string)}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            {isLoading ? (
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="h-24 text-center"
                  >
                    <p>Yuklanmoqda...</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <SortableContext
                items={items.map((item) => item._id)}
                strategy={verticalListSortingStrategy}
              >
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <DraggableRow
                        key={(row.original as { _id: string })._id}
                        row={row}
                      />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length + 1}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </SortableContext>
            )}
          </Table>
        </DndContext>
      </div>
      <div ref={sentinelRef} className="py-2 text-center text-sm text-muted-foreground">
        {isFetchingNextPage && <p>Yuklanmoqda...</p>}
        {!hasNextPage && items.length > 0 && !isLoading && (
          <p className="text-xs text-muted-foreground/60">Hammasi yuklandi</p>
        )}
      </div>
    </>
  );
};
