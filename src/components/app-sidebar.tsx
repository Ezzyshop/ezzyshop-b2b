import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { LogOutIcon } from "lucide-react";
import { cn, sidebarData } from "@/lib";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUserContext } from "@/contexts/user-context/user.context";
import { UserRoles, userRolesTranslations } from "@/lib/enums";
import { Button } from "./ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUserContext();

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <div className="flex items-center justify-center p-4">
          <img
            src="/icons/logo.svg"
            alt="logo"
            className="w-[50%] aspect-[32/9]"
          />
        </div>
        <SidebarMenu className="p-2">
          {sidebarData.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    cn("flex items-center gap-2", isActive && "bg-primary")
                  }
                >
                  {<item.icon />}
                  {item.title}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarFooter className="flex-grow flex items-end justify-end">
          <div className="flex items-center gap-2 w-full border-t pt-2">
            <Avatar className="w-10 h-10 rounded-lg">
              <AvatarFallback>{user.full_name ?? "N/A"}</AvatarFallback>
              <AvatarImage
                src={user.photo ?? "https://github.com/shadcn.png"}
              />
            </Avatar>
            <div className="flex flex-col flex-grow">
              <p className="font-semibold text-sm">{user.full_name ?? "N/A"}</p>
              <small>
                {
                  userRolesTranslations[
                    user.roles.find((role) => role === UserRoles.SuperAdmin) ??
                      UserRoles.Basic
                  ]
                }
              </small>
            </div>
            <NavLink to="/logout">
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <LogOutIcon className="w-4 h-4" />
              </Button>
            </NavLink>
          </div>
        </SidebarFooter>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
