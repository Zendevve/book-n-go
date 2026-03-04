import React from "react"
import Image from "next/image"

import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { UserSidebar } from "@/components/user-sidebar"

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <UserSidebar slug={slug} variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="relative flex-1">
          <Image
            src="/WaveBG.png"
            alt=""
            width={1440}
            height={320}
            className="absolute top-0 left-0 w-full h-auto"
            priority
          />
          <div className="relative">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
