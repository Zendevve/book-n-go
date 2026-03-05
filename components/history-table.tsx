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
  id: string
  business: string
  date: string
  timeStart: string
  timeEnd: string
  type: string
  status: string
}

const history: HistoryBooking[] = [
  {
    id: "BK001",
    business: "John's Barbershop",
    date: "2026-01-05",
    timeStart: "09:00 AM",
    timeEnd: "10:00 AM",
    type: "Appointment",
    status: "Completed",
  },
  {
    id: "BK002",
    business: "Jane's Salon",
    date: "2026-01-12",
    timeStart: "11:30 AM",
    timeEnd: "12:00 PM",
    type: "Appointment",
    status: "Canceled",
  },
  {
    id: "BK003",
    business: "John's Barbershop",
    date: "2026-01-20",
    timeStart: "02:00 PM",
    timeEnd: "04:00 PM",
    type: "Reservation",
    status: "Completed",
  },
  {
    id: "BK004",
    business: "Jane's Salon",
    date: "2026-02-03",
    timeStart: "10:00 AM",
    timeEnd: "11:00 AM",
    type: "Appointment",
    status: "Completed",
  },
  {
    id: "BK005",
    business: "John's Barbershop",
    date: "2026-02-15",
    timeStart: "03:30 PM",
    timeEnd: "04:30 PM",
    type: "Reservation",
    status: "Canceled",
  },
  {
    id: "BK006",
    business: "Jane's Salon",
    date: "2026-02-28",
    timeStart: "08:00 AM",
    timeEnd: "08:30 AM",
    type: "Appointment",
    status: "Completed",
  },
  {
    id: "BK007",
    business: "John's Barbershop",
    date: "2026-03-01",
    timeStart: "10:00 AM",
    timeEnd: "11:00 AM",
    type: "Appointment",
    status: "Completed",
  },
  {
    id: "BK008",
    business: "Glow Spa",
    date: "2026-03-02",
    timeStart: "01:00 PM",
    timeEnd: "02:30 PM",
    type: "Reservation",
    status: "Canceled",
  },
  {
    id: "BK009",
    business: "Jane's Salon",
    date: "2026-03-03",
    timeStart: "03:00 PM",
    timeEnd: "04:00 PM",
    type: "Appointment",
    status: "Completed",
  },
  {
    id: "BK010",
    business: "Glow Spa",
    date: "2026-03-04",
    timeStart: "09:30 AM",
    timeEnd: "10:30 AM",
    type: "Reservation",
    status: "Completed",
  },
  {
    id: "BK011",
    business: "John's Barbershop",
    date: "2026-03-05",
    timeStart: "11:00 AM",
    timeEnd: "12:00 PM",
    type: "Appointment",
    status: "Canceled",
  },
  {
    id: "BK012",
    business: "Glow Spa",
    date: "2026-03-06",
    timeStart: "02:00 PM",
    timeEnd: "03:30 PM",
    type: "Reservation",
    status: "Completed",
  },
  {
    id: "BK013",
    business: "Jane's Salon",
    date: "2026-03-07",
    timeStart: "10:00 AM",
    timeEnd: "11:00 AM",
    type: "Appointment",
    status: "Completed",
  },
  {
    id: "BK014",
    business: "John's Barbershop",
    date: "2026-03-08",
    timeStart: "08:30 AM",
    timeEnd: "09:30 AM",
    type: "Appointment",
    status: "Canceled",
  },
  {
    id: "BK015",
    business: "Glow Spa",
    date: "2026-03-09",
    timeStart: "04:00 PM",
    timeEnd: "05:00 PM",
    type: "Reservation",
    status: "Completed",
  },
].sort((a, b) => new Date(`${b.date} ${b.timeStart}`).getTime() - new Date(`${a.date} ${a.timeStart}`).getTime())

const statusClass: Record<string, string> = {
  Completed: "border-green-500 text-green-600",
  Canceled: "border-red-500 text-red-600",
}

const columns: ColumnDef<HistoryBooking>[] = [
  {
    accessorKey: "id",
    header: "Booking ID",
    cell: ({ row }) => <span className="font-mono text-xs text-muted-foreground">{row.getValue("id")}</span>,
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
    cell: ({ row }) => `${row.original.timeStart} - ${row.original.timeEnd}`,
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
