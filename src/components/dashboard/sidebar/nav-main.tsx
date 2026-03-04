import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useShopContext, useUserContext } from "@/contexts";
import { dashboardRoutes } from "@/routes/dashboard/dashboard.routes";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export function NavMain() {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const { activeShop } = useShopContext();
  const pathname = useLocation();

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

          const path = `/dashboard${item.path}`;

          if (hasAccess && item.title) {
            return (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.pathname === path}
                >
                  <Link to={path} className="block">
                    {item.icon && <item.icon />}
                    <span>{t(item.title)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
