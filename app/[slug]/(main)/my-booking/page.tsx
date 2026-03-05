"use client"

import { useSearchParams } from "next/navigation"
import { BookingReceipt, type BookingReceiptData } from "@/components/booking-receipt"
import { IconCalendarOff } from "@tabler/icons-react"

function parseReceiptData(params: URLSearchParams): BookingReceiptData | null {
  const ref = params.get("ref")
  const issuedAtRaw = params.get("issuedAt")
  const dateRaw = params.get("date")
  const startTime = params.get("startTime")
  const endTime = params.get("endTime")
  const name = params.get("name")
  const email = params.get("email")
  const phone = params.get("phone")

  if (!ref || !issuedAtRaw || !dateRaw || !startTime || !endTime || !name || !email || !phone) {
    return null
  }

  const issuedAt = new Date(issuedAtRaw)
  const date = new Date(dateRaw)
  if (isNaN(issuedAt.getTime()) || isNaN(date.getTime())) return null

  const duration = params.get("duration") || null

  const bookingType = params.get("bookingType") || "Appointment"
  const service = params.get("service") || undefined

  return { bookingRef: ref, issuedAt, date, startTime, endTime, duration, location: "Main Branch", bookingType, service, fullName: name, email, phone }
}

export default function MyBookingPage() {
  const searchParams = useSearchParams()
  const data = parseReceiptData(searchParams)

  if (!data) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
          <IconCalendarOff className="size-10 opacity-40" />
          <p className="text-sm">No booking found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <BookingReceipt data={data} />
      </div>
    </div>
  )
}
