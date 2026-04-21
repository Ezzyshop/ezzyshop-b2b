import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useShopContext, useUserContext } from "@/contexts";
import { dashboardRoutes } from "@/routes/dashboard/dashboard.routes";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export function NavMain() {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const { activeShop } = useShopContext();
  const { pathname } = useLocation();

  const userShop = user.shops.find((shop) => shop.shop._id === activeShop._id);

  if (!userShop) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {dashboardRoutes.map((item) => {
          const hasAccess = item.roles.some((role) =>
            userShop.roles.includes(role)
          );

          if (!hasAccess || !item.title) return null;

          // Item with sub-menu
          if (item.children?.length) {
            const isAnyChildActive = item.children.some(
              (child) => pathname === `/dashboard${child.path}`
            );

            return (
              <Collapsible
                key={item.path}
                asChild
                defaultOpen={isAnyChildActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={isAnyChildActive} tooltip={t(item.title)}>
                      {item.icon && <item.icon />}
                      <span>{t(item.title)}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children.map((child) => {
                        const childPath = `/dashboard${child.path}`;
                        const isActive = pathname === childPath;
                        return (
                          <SidebarMenuSubItem key={child.path}>
                            <SidebarMenuSubButton asChild isActive={isActive}>
                              <Link to={childPath}>
                                {child.icon && <child.icon />}
                                <span>{t(child.title)}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          // Regular flat item
          const path = `/dashboard${item.path}`;
          return (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild isActive={pathname === path} tooltip={t(item.title)}>
                <Link to={path}>
                  {item.icon && <item.icon />}
                  <span>{t(item.title)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
