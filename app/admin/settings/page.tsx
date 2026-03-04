import { WebsiteConfiguration } from "@/components/website-configuration"
import { BusinessProfile } from "@/components/business-profile"
import { ChangeTheme } from "@/components/change-theme"

const SettingsPage = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex flex-wrap items-stretch gap-4 px-4 lg:px-6">
            <div className="flex min-w-[420px] flex-1 flex-col [&>*]:flex-1">
              <WebsiteConfiguration />
            </div>
            <div className="flex min-w-[360px] flex-1 flex-col gap-4">
              <BusinessProfile />
              <ChangeTheme />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage