import { BookingCalendar } from "@/components/booking-calendar"
import { BookingSteps } from "@/components/booking-steps"
import { Button } from "@/components/ui/button"
import { IconArrowRight } from "@tabler/icons-react"

export default function BookNowPage() {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center p-6">
      <div className="flex w-full max-w-3xl flex-col gap-6">
        <BookingSteps current={1} />
        <BookingCalendar />
        <div className="flex justify-center">
          <Button className="gap-2 bg-[#3A79C3] hover:bg-[#3164a8]">
            Continue
            <IconArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
