"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

type GetRowId<T> = (row: T) => string;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  onReorder?: (rows: TData[]) => void;
  getRowId?: GetRowId<TData>;
  disableDnd?: boolean;

  /** sayfa boyutu seçenekleri; varsayılan [10,20,50] */
  pageSizeOptions?: number[];
  /** başlangıç sayfa boyutu; varsayılan 10 */
  initialPageSize?: number;
}

/** Sortable row */
function SortableRow(props: {
  id: string;
  children: React.ReactNode;
  className?: string;
  "data-state"?: string | false;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : undefined,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={props.className}
      data-state={props["data-state"]}
      {...attributes}
    >
      {props.children &&
        React.Children.map(props.children as any, (child: any) => {
          if (child?.props?.["data-dnd-handle"] === "true") {
            return React.cloneElement(child, {
              ...child.props,
              ...listeners,
              style: { cursor: "grab", ...child.props?.style },
            });
          }
          return child;
        })}
    </TableRow>
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onReorder,
  getRowId,
  disableDnd,
  pageSizeOptions = [10, 20, 50],
  initialPageSize = 10,
}: DataTableProps<TData, TValue>) {
  const rowId: GetRowId<TData> = React.useMemo(
    () =>
      getRowId ??
      ((r: TData) => {
        const a = r as any;
        if (!a?.id)
          throw new Error(
            "DataTable: getRowId verin veya her satırda 'id' alanı bulundurun."
          );
        return String(a.id);
      }),
    [getRowId]
  );

  const [rows, setRows] = React.useState<TData[]>(data);
  React.useEffect(() => setRows(data), [data]);

  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const table = useReactTable({
    data: rows,
    columns,
    getRowId: (original) => rowId(original),
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: setPagination as any,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    // sadece mevcut sayfa içinde reorder
    const pageRows = table.getRowModel().rows; // paginated rows
    const oldIndex = pageRows.findIndex((r) => r.id === active.id);
    const newIndex = pageRows.findIndex((r) => r.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    // global indekse çevirmek için mevcut sayfanın başlangıç offset’i:
    const start = pageIndex * pageSize;
    const globalOld = start + oldIndex;
    const globalNew = start + newIndex;

    const newRows = arrayMove(rows, globalOld, globalNew);
    setRows(newRows);
    onReorder?.(newRows);
  };

  const body = (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        <SortableContext
          items={table.getRowModel().rows.map((r) => r.id)}
          strategy={verticalListSortingStrategy}
        >
          {table.getRowModel().rows.map((row) => (
            <SortableRow
              key={row.id}
              id={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  data-dnd-handle={
                    (cell.column.columnDef.meta as any)?.dndHandle
                      ? "true"
                      : undefined
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </SortableRow>
          ))}
        </SortableContext>
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );

  const total = rows.length;
  const from = total === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min(total, (pageIndex + 1) * pageSize);
  const totalPages = Math.max(1, table.getPageCount());

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h) => (
                <TableHead key={h.id}>
                  {h.isPlaceholder
                    ? null
                    : flexRender(h.column.columnDef.header, h.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {disableDnd ? (
          body
        ) : (
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            {body}
          </DndContext>
        )}
      </Table>

      {/* Pagination bar */}
      <div className="flex items-center justify-between px-3 py-2 border-t">
        <div className="flex items-center gap-2 text-sm">
          <span className="whitespace-nowrap">Rows per page:</span>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => table.setPageSize(Number(v))}
          >
            <SelectTrigger className="h-8 w-[90px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((opt) => (
                <SelectItem key={opt} value={String(opt)}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span className="ml-4">
            {from}-{to} of {total}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="mx-2 text-sm">
            {pageIndex + 1} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
