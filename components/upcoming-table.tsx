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
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontalIcon } from "lucide-react"
import { IconCalendarClock } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

type Booking = {
  ref: string
  name: string
  email: string
  contact: string
  date: string
  timeStart: string
  timeEnd: string
  duration: string
  type: string
  service: string
  location: string
  status: string
}

const allBookings: Booking[] = [
  { ref: "BNG-A1B2C3D4", name: "Alice Johnson", email: "alice@example.com", contact: "+639171234567", date: "2026-02-27", timeStart: "09:00 AM", timeEnd: "10:00 AM", duration: "1 hour", type: "Appointment", service: "Check-up", location: "Main Branch", status: "Completed" },
  { ref: "BNG-E5F6G7H8", name: "Bob Smith", email: "bob@example.com", contact: "+639282345678", date: "2026-02-27", timeStart: "11:00 AM", timeEnd: "01:00 PM", duration: "2 hours", type: "Reservation", service: "Conference Hall", location: "Main Branch", status: "Pending" },
  { ref: "BNG-I9J0K1L2", name: "Carol White", email: "carol@example.com", contact: "+639393456789", date: "2026-02-28", timeStart: "02:00 PM", timeEnd: "03:00 PM", duration: "1 hour", type: "Appointment", service: "Consultation", location: "Main Branch", status: "Completed" },
  { ref: "BNG-M3N4O5P6", name: "David Lee", email: "david@example.com", contact: "+639154567890", date: "2026-03-01", timeStart: "10:00 AM", timeEnd: "12:00 PM", duration: "2 hours", type: "Reservation", service: "Event Place", location: "Main Branch", status: "Pending" },
  { ref: "BNG-Q7R8S9T0", name: "Eva Martinez", email: "eva@example.com", contact: "+639265678901", date: "2026-03-02", timeStart: "03:00 PM", timeEnd: "04:00 PM", duration: "1 hour", type: "Appointment", service: "Follow-up", location: "Main Branch", status: "Canceled" },
  { ref: "BNG-U1V2W3X4", name: "Franco Reyes", email: "franco@example.com", contact: "+639176789012", date: "2026-03-03", timeStart: "08:00 AM", timeEnd: "09:00 AM", duration: "1 hour", type: "Reservation", service: "Room", location: "Main Branch", status: "Completed" },
  { ref: "BNG-Y5Z6A7B8", name: "Grace Santos", email: "grace@example.com", contact: "+639287890123", date: "2026-03-03", timeStart: "01:00 PM", timeEnd: "02:00 PM", duration: "1 hour", type: "Appointment", service: "Meeting", location: "Main Branch", status: "Pending" },
  { ref: "BNG-C9D0E1F2", name: "Henry Cruz", email: "henry@example.com", contact: "+639398901234", date: "2026-03-04", timeStart: "10:00 AM", timeEnd: "11:00 AM", duration: "1 hour", type: "Reservation", service: "Table", location: "Main Branch", status: "Completed" },
  { ref: "BNG-G3H4I5J6", name: "Isabel Flores", email: "isabel@example.com", contact: "+639159012345", date: "2026-03-04", timeStart: "02:00 PM", timeEnd: "03:00 PM", duration: "1 hour", type: "Appointment", service: "Check-up", location: "Main Branch", status: "Canceled" },
  { ref: "BNG-K7L8M9N0", name: "Jose Dela Cruz", email: "jose@example.com", contact: "+639260123456", date: "2026-03-05", timeStart: "09:00 AM", timeEnd: "11:00 AM", duration: "2 hours", type: "Reservation", service: "Conference Hall", location: "Main Branch", status: "Pending" },
  { ref: "BNG-O1P2Q3R4", name: "Karen Mendoza", email: "karen@example.com", contact: "+639171234568", date: "2026-03-05", timeStart: "11:00 AM", timeEnd: "12:00 PM", duration: "1 hour", type: "Appointment", service: "Consultation", location: "Main Branch", status: "Completed" },
  { ref: "BNG-S5T6U7V8", name: "Luis Garcia", email: "luis@example.com", contact: "+639282345679", date: "2026-03-06", timeStart: "03:00 PM", timeEnd: "05:00 PM", duration: "2 hours", type: "Reservation", service: "Event Place", location: "Main Branch", status: "Pending" },
  { ref: "BNG-W9X0Y1Z2", name: "Maria Torres", email: "maria@example.com", contact: "+639393456780", date: "2026-03-07", timeStart: "08:00 AM", timeEnd: "09:00 AM", duration: "1 hour", type: "Appointment", service: "Follow-up", location: "Main Branch", status: "Completed" },
  { ref: "BNG-A3B4C5D6", name: "Nathan Aquino", email: "nathan@example.com", contact: "+639154567891", date: "2026-03-07", timeStart: "01:00 PM", timeEnd: "03:00 PM", duration: "2 hours", type: "Reservation", service: "Room", location: "Main Branch", status: "Canceled" },
  { ref: "BNG-E7F8G9H0", name: "Olivia Ramos", email: "olivia@example.com", contact: "+639265678902", date: "2026-03-08", timeStart: "10:00 AM", timeEnd: "11:00 AM", duration: "1 hour", type: "Appointment", service: "Meeting", location: "Main Branch", status: "Pending" },
]

const upcomingBookings = allBookings
  .filter((b) => b.status === "Pending")
  .sort((a, b) => new Date(`${a.date} ${a.timeStart}`).getTime() - new Date(`${b.date} ${b.timeStart}`).getTime())

const statusClass: Record<string, string> = {
  Pending: "border-yellow-500 text-yellow-600",
}

const columns: ColumnDef<Booking>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ref",
    header: "Booking Ref",
    cell: ({ row }) => <span className="font-mono text-xs text-muted-foreground">{row.getValue("ref")}</span>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Customer <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue("email")}</span>,
  },
  {
    accessorKey: "contact",
    header: "Phone",
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
    accessorKey: "duration",
    header: "Duration",
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
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
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
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Cancel Booking</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export function UpcomingTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: upcomingBookings,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <IconCalendarClock className="size-4 text-blue-500" />
            <h1 className="bg-gradient-to-r from-[#3F51B5] via-[#3A79C3] to-[#329A9A] bg-clip-text text-base font-bold text-transparent">
              Upcoming Bookings
            </h1>
          </div>
          <Link href="/admin/bookings" className="text-sm font-medium text-[#3A79C3] hover:underline">
            View All
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
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
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
                    No upcoming bookings.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
