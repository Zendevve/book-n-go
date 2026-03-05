"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { IconCalendar, IconClock } from "@tabler/icons-react"

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
]

const bookedSlots = ["10:00 AM", "2:00 PM"]

const bookedDates = [
  new Date(2026, 2, 7),
  new Date(2026, 2, 10),
  new Date(2026, 2, 14),
]

export function BookingCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = React.useState<string | null>(null)
  const [endTime, setEndTime] = React.useState<string | null>(null)

  const slotIndex = (slot: string) => timeSlots.indexOf(slot)

  const hasConflict = (from: string, to: string) => {
    const fromIdx = slotIndex(from)
    const toIdx = slotIndex(to)
    return bookedSlots.some((b) => {
      const bi = slotIndex(b)
      return bi > fromIdx && bi < toIdx
    })
  }

  const handleTimeClick = (slot: string) => {
    if (!startTime) {
      setStartTime(slot)
      setEndTime(null)
      return
    }
    if (slot === startTime) {
      setStartTime(null)
      setEndTime(null)
      return
    }
    const clickedIdx = slotIndex(slot)
    const startIdx = slotIndex(startTime)
    if (clickedIdx < startIdx) {
      setStartTime(slot)
      setEndTime(null)
      return
    }
    if (hasConflict(startTime, slot)) return
    setEndTime(slot)
  }

  const isInRange = (slot: string) => {
    if (!startTime || !endTime) return false
    const i = slotIndex(slot)
    return i > slotIndex(startTime) && i < slotIndex(endTime)
  }

  const isDisabled = (slot: string) => {
    if (bookedSlots.includes(slot)) return true
    if (startTime && !endTime) {
      const clickedIdx = slotIndex(slot)
      const startIdx = slotIndex(startTime)
      if (clickedIdx > startIdx && hasConflict(startTime, slot)) return true
    }
    return false
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-[#3F51B5] via-[#3A79C3] to-[#329A9A] bg-clip-text text-base font-bold text-transparent">
          Select Date &amp; Time
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4 pt-0 md:flex-row">
        {/* Calendar Card */}
        <Card className="flex-[4]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <IconCalendar className="size-4" />
              Pick a date
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              captionLayout="dropdown"
              disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
              className="w-full [--cell-size:--spacing(10)] [&_button[data-selected-single=true]]:bg-[#3A79C3] [&_button[data-selected-single=true]]:text-white [&_button[data-selected-single=true]]:hover:bg-[#3164a8]"
              classNames={{ root: "w-full" }}
              modifiers={{
                booked: bookedDates,
                available: { after: new Date(new Date().setHours(0, 0, 0, 0)) },
              }}
              modifiersClassNames={{
                booked: "[&_button]:!bg-red-100 [&_button]:!text-red-600 [&_button:hover]:!bg-red-200",
                available: "!text-green-700",
                disabled: "!text-muted-foreground !opacity-40",
              }}
              formatters={{
                formatMonthDropdown: (d) =>
                  d.toLocaleString("default", { month: "long" }),
              }}
            />
            <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-3 rounded-sm bg-green-100 ring-1 ring-green-400" />
                Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-3 rounded-sm bg-red-100 ring-1 ring-red-400" />
                Fully Booked
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-3 rounded-sm bg-muted ring-1 ring-border" />
                Unavailable
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Time Range Card */}
        <Card className="flex-[3]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <IconClock className="size-4" />
              Pick a start &amp; end time
              {date && (
                <span className="ml-auto text-xs text-foreground">
                  {date.toLocaleDateString("default", { weekday: "short", month: "short", day: "numeric" })}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {(startTime || endTime) && (
              <p className="text-xs text-[#3A79C3]">
                {startTime && !endTime && <>Start: <strong>{startTime}</strong> — pick an end time</>}
                {startTime && endTime && <>Selected: <strong>{startTime}</strong> → <strong>{endTime}</strong></>}
              </p>
            )}
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => {
                const isStart = startTime === slot
                const isEnd = endTime === slot
                const inRange = isInRange(slot)
                return (
                  <button
                    key={slot}
                    disabled={isDisabled(slot)}
                    onClick={() => handleTimeClick(slot)}
                    className={cn(
                      "rounded-md border px-3 py-2 text-sm font-medium transition-all",
                      isDisabled(slot)
                        ? "cursor-not-allowed border-border bg-muted text-muted-foreground line-through opacity-50"
                        : isStart || isEnd
                        ? "border-[#3A79C3] bg-[#3A79C3] text-white ring-1 ring-[#3A79C3]"
                        : inRange
                        ? "border-[#3A79C3]/40 bg-[#3A79C3]/10 text-[#3A79C3]"
                        : "border-border hover:border-[#3A79C3] hover:bg-[#3A79C3]/5"
                    )}
                  >
                    {slot}
                    {bookedSlots.includes(slot) && (
                      <Badge variant="outline" className="ml-1.5 border-red-300 px-1 py-0 text-[10px] text-red-400">
                        Full
                      </Badge>
                    )}
                  </button>
                )
              })}
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-3 rounded-sm bg-background ring-1 ring-border" />
                Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-3 rounded-sm bg-[#3A79C3] ring-1 ring-[#3A79C3]" />
                Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-3 rounded-sm bg-muted ring-1 ring-border opacity-50" />
                Unavailable / Full
              </span>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
