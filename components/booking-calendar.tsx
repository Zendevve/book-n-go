"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TIME_SLOTS } from "@/lib/booking-constants"
import { IconCalendar, IconCalendarEvent, IconClock, IconClipboardList } from "@tabler/icons-react"

const bookedSlots = ["10:00 AM", "2:00 PM"]

const bookedDates = [
  new Date(2026, 2, 7),
  new Date(2026, 2, 10),
  new Date(2026, 2, 14),
]

const today = new Date(new Date().setHours(0, 0, 0, 0))

type BookingType = "Appointment" | "Reservation"

interface BookingCalendarProps {
  onChange?: (value: { date: Date | undefined; startTime: string | null; endTime: string | null; bookingType: BookingType }) => void
}

export function BookingCalendar({ onChange }: BookingCalendarProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [startTime, setStartTime] = React.useState<string | null>(null)
  const [endTime, setEndTime] = React.useState<string | null>(null)
  const [bookingType, setBookingType] = React.useState<BookingType>("Appointment")

  const onChangeRef = React.useRef(onChange)
  React.useLayoutEffect(() => { onChangeRef.current = onChange })

  React.useEffect(() => {
    onChangeRef.current?.({ date, startTime, endTime, bookingType })
  }, [date, startTime, endTime, bookingType])

  const slotIndex = (slot: string) => TIME_SLOTS.indexOf(slot)

  const hasConflict = (from: string, to: string) => {
    const fromIdx = slotIndex(from)
    const toIdx = slotIndex(to)
    return bookedSlots.some((b) => {
      const bi = slotIndex(b)
      return bi > fromIdx && bi < toIdx
    })
  }

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate)
    setStartTime(null)
    setEndTime(null)
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

  const isDateBooked = (d: Date) =>
    bookedDates.some((bd) => bd.toDateString() === d.toDateString())

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:items-stretch">
        {/* Calendar Card */}
        <Card className="flex flex-col gap-2 md:flex-[5]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <IconCalendar className="size-4 text-blue-500" />
              <span className="bg-gradient-to-r from-[#3F51B5] via-[#3A79C3] to-[#329A9A] bg-clip-text text-base font-bold text-transparent">
                Pick a date
              </span>
            </CardTitle>
            <CardDescription>Select your preferred appointment date.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between gap-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              captionLayout="dropdown"
              disabled={(d) => d < today}
              className="w-full flex-1 [--cell-size:--spacing(10)] [&_button[data-selected-single=true]]:bg-[#3A79C3] [&_button[data-selected-single=true]]:text-white [&_button[data-selected-single=true]]:hover:bg-[#3164a8]"
              classNames={{ root: "w-full" }}
              modifiers={{
                booked: bookedDates,
                available: (d) => d >= today && !isDateBooked(d),
              }}
              modifiersClassNames={{
                available: "[&_button]:bg-green-50 [&_button]:text-green-800 [&_button:hover]:bg-green-100",
                booked: "[&_button]:!bg-red-100 [&_button]:!text-red-600 [&_button:hover]:!bg-red-200 [&_button]:cursor-not-allowed [&_button]:pointer-events-none",
                disabled: "[&_button]:!bg-transparent !text-muted-foreground !opacity-40",
              }}
              formatters={{
                formatMonthDropdown: (d) =>
                  d.toLocaleString("default", { month: "long" }),
              }}
            />
            <div className="flex items-center justify-center gap-4 pt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="inline-block shrink-0 size-3 rounded-sm bg-green-100 ring-1 ring-green-400" />
                Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block shrink-0 size-3 rounded-sm bg-red-100 ring-1 ring-red-400" />
                Fully Booked
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block shrink-0 size-3 rounded-sm bg-muted ring-1 ring-border" />
                Unavailable
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Right column: time + booking type */}
        <div className="flex flex-col gap-4 md:flex-[3]">
          {/* Time Range Card */}
          <Card className="flex flex-1 flex-col gap-2">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <IconClock className="size-4 text-blue-500" />
                <span className="bg-gradient-to-r from-[#3F51B5] via-[#3A79C3] to-[#329A9A] bg-clip-text text-base font-bold text-transparent">
                  Pick a time
                </span>
                {date && (
                  <span className="ml-auto text-xs font-normal text-muted-foreground">
                    {date.toLocaleDateString("default", { weekday: "short", month: "short", day: "numeric" })}
                  </span>
                )}
              </CardTitle>
              <CardDescription>Choose a start and end time for your slot.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-2">
              {(startTime || endTime) && (
                <p className="text-xs text-[#3A79C3]">
                  {startTime && !endTime && <>Start: <strong>{startTime}</strong> — pick an end time</>}
                  {startTime && endTime && <>Selected: <strong>{startTime}</strong> → <strong>{endTime}</strong></>}
                </p>
              )}
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-2 h-full">
                  {TIME_SLOTS.map((slot) => {
                    const isStart = startTime === slot
                    const isEnd = endTime === slot
                    const inRange = isInRange(slot)
                    const disabled = isDisabled(slot)
                    return (
                      <button
                        key={slot}
                        disabled={disabled}
                        aria-pressed={isStart || isEnd}
                        onClick={() => handleTimeClick(slot)}
                        className={cn(
                          "rounded-md border px-3 py-2 text-sm font-medium transition-all",
                          disabled
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
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block shrink-0 size-3 rounded-sm bg-background ring-1 ring-border" />
                  Available
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block shrink-0 size-3 rounded-sm bg-[#3A79C3] ring-1 ring-[#3A79C3]" />
                  Selected
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block shrink-0 size-3 rounded-sm bg-muted ring-1 ring-border opacity-50" />
                  Unavailable / Full
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Booking Type Card */}
          <Card className="gap-2">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <IconCalendarEvent className="size-4 text-blue-500" />
                <span className="bg-gradient-to-r from-[#3F51B5] via-[#3A79C3] to-[#329A9A] bg-clip-text text-base font-bold text-transparent">
                  Booking Type
                </span>
              </CardTitle>
              <CardDescription>Select whether this is an appointment or a reservation.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {(["Appointment", "Reservation"] as const).map((type) => {
                  const Icon = type === "Appointment" ? IconCalendarEvent : IconClipboardList
                  return (
                    <button
                      key={type}
                      onClick={() => setBookingType(type)}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-all",
                        bookingType === type
                          ? "border-[#3A79C3] bg-[#3A79C3] text-white ring-1 ring-[#3A79C3]"
                          : "border-border hover:border-[#3A79C3] hover:bg-[#3A79C3]/5"
                      )}
                    >
                      <Icon className="size-4" />
                      {type}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  )
}
