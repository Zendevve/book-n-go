"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontalIcon } from "lucide-react"
import { IconHistory } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type HistoryBooking = {
  ref: string
  business: string
  date: string
  timeStart: string
  timeEnd: string
  type: string
  service: string
  status: string
}

const history: HistoryBooking[] = [
  { ref: "BNG-A1B2C3D4", business: "John's Barbershop", date: "2026-01-05", timeStart: "09:00 AM", timeEnd: "10:00 AM", type: "Appointment", service: "Haircut", status: "Completed" },
  { ref: "BNG-E5F6G7H8", business: "Jane's Salon", date: "2026-01-12", timeStart: "11:30 AM", timeEnd: "12:30 PM", type: "Appointment", service: "Consultation", status: "Canceled" },
  { ref: "BNG-I9J0K1L2", business: "John's Barbershop", date: "2026-01-20", timeStart: "02:00 PM", timeEnd: "04:00 PM", type: "Reservation", service: "Event Place", status: "Completed" },
  { ref: "BNG-M3N4O5P6", business: "Jane's Salon", date: "2026-02-03", timeStart: "10:00 AM", timeEnd: "11:00 AM", type: "Appointment", service: "Follow-up", status: "Completed" },
  { ref: "BNG-Q7R8S9T0", business: "John's Barbershop", date: "2026-02-15", timeStart: "03:00 PM", timeEnd: "05:00 PM", type: "Reservation", service: "Conference Hall", status: "Canceled" },
  { ref: "BNG-U1V2W3X4", business: "Jane's Salon", date: "2026-02-28", timeStart: "08:00 AM", timeEnd: "09:00 AM", type: "Appointment", service: "Check-up", status: "Completed" },
  { ref: "BNG-Y5Z6A7B8", business: "John's Barbershop", date: "2026-03-01", timeStart: "10:00 AM", timeEnd: "11:00 AM", type: "Appointment", service: "Meeting", status: "Completed" },
  { ref: "BNG-C9D0E1F2", business: "Glow Spa", date: "2026-03-02", timeStart: "01:00 PM", timeEnd: "03:00 PM", type: "Reservation", service: "Room", status: "Canceled" },
  { ref: "BNG-G3H4I5J6", business: "Jane's Salon", date: "2026-03-03", timeStart: "03:00 PM", timeEnd: "04:00 PM", type: "Appointment", service: "Consultation", status: "Completed" },
  { ref: "BNG-K7L8M9N0", business: "Glow Spa", date: "2026-03-04", timeStart: "09:00 AM", timeEnd: "11:00 AM", type: "Reservation", service: "Table", status: "Completed" },
  { ref: "BNG-O1P2Q3R4", business: "John's Barbershop", date: "2026-03-05", timeStart: "11:00 AM", timeEnd: "12:00 PM", type: "Appointment", service: "Follow-up", status: "Canceled" },
  { ref: "BNG-S5T6U7V8", business: "Glow Spa", date: "2026-03-06", timeStart: "02:00 PM", timeEnd: "04:00 PM", type: "Reservation", service: "Event Place", status: "Completed" },
  { ref: "BNG-W9X0Y1Z2", business: "Jane's Salon", date: "2026-03-07", timeStart: "10:00 AM", timeEnd: "11:00 AM", type: "Appointment", service: "Check-up", status: "Completed" },
  { ref: "BNG-A3B4C5D6", business: "John's Barbershop", date: "2026-03-08", timeStart: "08:00 AM", timeEnd: "09:00 AM", type: "Appointment", service: "Consultation", status: "Canceled" },
  { ref: "BNG-E7F8G9H0", business: "Glow Spa", date: "2026-03-09", timeStart: "04:00 PM", timeEnd: "05:00 PM", type: "Reservation", service: "Room", status: "Completed" },
].sort((a, b) => new Date(`${b.date} ${b.timeStart}`).getTime() - new Date(`${a.date} ${a.timeStart}`).getTime())

const statusClass: Record<string, string> = {
  Completed: "border-green-500 text-green-600",
  Canceled: "border-red-500 text-red-600",
}

const columns: ColumnDef<HistoryBooking>[] = [
  {
    accessorKey: "ref",
    header: "Booking Ref",
    cell: ({ row }) => <span className="font-mono text-xs text-muted-foreground">{row.getValue("ref")}</span>,
  },
  {
    accessorKey: "business",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Business <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span className="font-medium">{row.getValue("business")}</span>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Date <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "time",
    header: "Time",
    cell: ({ row }) => `${row.original.timeStart} – ${row.original.timeEnd}`,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Type <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => <span className="text-sm">{row.getValue("service")}</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Status <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className={statusClass[row.getValue("status") as string]}>
        {row.getValue("status") as string}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Book Again</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export function HistoryTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data: history,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnFilters, columnVisibility },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconHistory className="size-4 text-blue-500" />
          <h1 className="bg-gradient-to-r from-[#3F51B5] via-[#3A79C3] to-[#329A9A] bg-clip-text text-base font-bold text-transparent">
            Booking History
          </h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="flex items-center gap-2 pb-4">
          <Input
            placeholder="Filter by business..."
            value={(table.getColumn("business")?.getFilterValue() as string) ?? ""}
            onChange={(e) => table.getColumn("business")?.setFilterValue(e.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    className="capitalize"
                    checked={col.getIsVisible()}
                    onCheckedChange={(value) => col.toggleVisibility(!!value)}
                  >
                    {col.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No history found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
