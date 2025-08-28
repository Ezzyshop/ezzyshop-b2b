import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { moderatorSidebarData } from "@/lib";
import { ModeratorSidebarUser } from "./moderator-sidebar-user";
import { getLogo } from "@/lib/get-logo";
import { useTheme } from "@/contexts";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarHeader className="flex items-center justify-center p-4">
          <img
            src={getLogo(theme)}
            alt="logo"
            className=""
          />
        </SidebarHeader>
        <SidebarMenu className="p-2">
          {moderatorSidebarData.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname.includes(item.url)}
                className=""
              >
                <NavLink to={item.url}>
                  {<item.icon />}
                  {item.title}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <ModeratorSidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
}
