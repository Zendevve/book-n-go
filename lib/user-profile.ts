export type UserProfile = {
  firstName: string
  middleName?: string
  lastName: string
  email: string
  phone: string
}

const STORAGE_KEY = "bng_user_profile"

export function getUserProfile(): UserProfile | null {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as UserProfile) : null
  } catch {
    return null
  }
}

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}
