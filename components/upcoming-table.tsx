import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle} from "./ui/card"
import { MoreHorizontalIcon } from "lucide-react"
import { IconReport } from "@tabler/icons-react"

const bookings = [
  {
    id: "BK001",
    name: "Alice Johnson",
    contact: "+639171234567",
    date: "2026-02-27",
    timeStart: "09:00 AM",
    timeEnd: "10:00 AM",
    type: "Appointment",
    status: "Completed",
  },
  {
    id: "BK002",
    name: "Bob Smith",
    contact: "+639282345678",
    date: "2026-02-27",
    timeStart: "11:30 AM",
    timeEnd: "12:30 PM",
    type: "Reservation",
    status: "Pending",
  },
  {
    id: "BK003",
    name: "Carol White",
    contact: "+639393456789",
    date: "2026-02-28",
    timeStart: "02:00 PM",
    timeEnd: "03:00 PM",
    type: "Appointment",
    status: "Completed",
  },
  {
    id: "BK004",
    name: "David Lee",
    contact: "+639154567890",
    date: "2026-03-01",
    timeStart: "10:00 AM",
    timeEnd: "11:00 AM",
    type: "Reservation",
    status: "Pending",
  },
  {
    id: "BK005",
    name: "Eva Martinez",
    contact: "+639265678901",
    date: "2026-03-02",
    timeStart: "03:30 PM",
    timeEnd: "04:30 PM",
    type: "Appointment",
    status: "Canceled",
  },
].sort((a, b) => {
  const dateTimeA = new Date(`${a.date} ${a.timeStart}`)
  const dateTimeB = new Date(`${b.date} ${b.timeStart}`)
  return dateTimeA.getTime() - dateTimeB.getTime()
})

const statusClass: Record<string, string> = {
  Completed: "border-green-500 text-green-600",
  Pending: "border-yellow-500 text-yellow-600",
  Canceled: "border-red-500 text-red-600",
}

export function UpcomingTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconReport className="size-4 text-blue-500" />
          <h1 className="bg-gradient-to-r from-[#3F51B5] via-[#3A79C3] to-[#329A9A] bg-clip-text text-base font-bold text-transparent">Upcoming Bookings</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.name}</TableCell>
                <TableCell>{booking.contact}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.timeStart} - {booking.timeEnd}</TableCell>
                <TableCell>{booking.type}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusClass[booking.status]}>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
