"use client"

import * as React from "react"
import {
  IconCalendarClock,
  IconCalendarCheck,
  IconHistory,
  IconDashboard,
  IconUser,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Book N. Go",
    email: "BookNGo@gmail.com",
    avatar: "/BNGCircleTransparent.png",
  },
  navMain: [    
    {
      title: "Book Now",
      url: "/user/book-now",
      icon: IconCalendarClock,
    },
    {
      title: "My Booking",
      url: "/user/my-booking",
      icon: IconCalendarCheck,
    },
    {
      title: "History",
      url: "/user/history",
      icon: IconHistory,
    },
    {
      title: "Profile",
      url: "/user/profile",
      icon: IconUser,
    },
  ],
}

export function UserSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-3 data-[slot=sidebar-menu-button]:!h-auto"
            >
              <a href="#" className="flex w-full items-center gap-3">
                <Avatar className="h-20 w-20 overflow-hidden rounded-xl">
                  <AvatarImage src="/BNGLogo.png" alt="BookNGo" className="scale-125 object-cover" />
                  <AvatarFallback className="rounded-xl text-base">BG</AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="bg-gradient-to-r from-[#3F51B5] via-[#3A79C3] to-[#329A9A] bg-clip-text text-3xl font-bold text-transparent">
                    BookNGo
                  </span>
                  <span className="text-base font-semibold text-[#3EB09B]">User Panel</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
