export type ServiceOption = {
  id: string
  label: string
  description?: string
}

export type ServicesConfig = {
  appointment: ServiceOption[]
  reservation: ServiceOption[]
}

export const DEFAULT_SERVICES: ServicesConfig = {
  appointment: [
    { id: "checkup", label: "Check-up", description: "Routine health or wellness examination" },
    { id: "consultation", label: "Consultation", description: "One-on-one professional consultation" },
    { id: "follow-up", label: "Follow-up Visit", description: "Follow-up on a previous appointment" },
    { id: "meeting", label: "Meeting", description: "Business or team meeting" },
  ],
  reservation: [
    { id: "room", label: "Room", description: "Private room booking" },
    { id: "conference", label: "Conference Hall", description: "Meeting and conference space" },
    { id: "event-place", label: "Event Place", description: "Large event or function venue" },
    { id: "table", label: "Table", description: "Dining or workspace table" },
  ],
}

const STORAGE_KEY = "bng_services_config"

export function getServicesConfig(): ServicesConfig {
  if (typeof window === "undefined") return DEFAULT_SERVICES
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as ServicesConfig) : DEFAULT_SERVICES
  } catch {
    return DEFAULT_SERVICES
  }
}

export function saveServicesConfig(config: ServicesConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
}
