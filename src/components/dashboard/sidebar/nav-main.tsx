import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { dashboardSidebarData } from "@/lib";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export function NavMain() {
  const { t } = useTranslation();
  const pathname = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {dashboardSidebarData.map((item) => (
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={item.title}
              asChild
              isActive={pathname.pathname === item.url}
            >
              <Link to={item.url} className="block">
                {item.icon && <item.icon />}
                <span>{t(item.title)}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
