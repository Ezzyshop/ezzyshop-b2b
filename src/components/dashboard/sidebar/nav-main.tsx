import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BookOpen, Bot, Settings2 } from "lucide-react";

const sidebarItems = [
  {
    icon: BookOpen,
    title: "History",
    url: "#",
  },
  {
    icon: Bot,
    title: "Starred",
    url: "#",
  },
  {
    icon: Settings2,
    title: "Settings",
    url: "#",
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {sidebarItems.map((item) => (
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
