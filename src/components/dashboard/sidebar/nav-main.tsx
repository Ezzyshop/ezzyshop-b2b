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
import { usePermissionContext } from "@/contexts/permission-context";
import { dashboardRoutes, type ChildRoute } from "@/routes/dashboard/dashboard.routes";
import { RouteAccess } from "@/lib/types/permission.types";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const useRouteAccess = () => {
  const { isAdmin, hasPermission } = usePermissionContext();

  return (access: RouteAccess): boolean => {
    if (access.accessType === "admin-only") return isAdmin;
    if (access.accessType === "permission") return hasPermission(access.resource, access.action);
    return true;
  };
};

export function NavMain() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const checkAccess = useRouteAccess();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {dashboardRoutes.map((item) => {
          if (!item.title) return null;

          // For parent items with children: show if any child is accessible
          if (item.children?.length) {
            const accessibleChildren = item.children.filter(
              (child): child is ChildRoute & { title: string } =>
                Boolean(child.title) && checkAccess(child.access),
            );

            if (accessibleChildren.length === 0) return null;

            const isAnyChildActive = item.children.some(
              (child) => pathname === `/dashboard${child.path}`,
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
                    <SidebarMenuButton
                      isActive={isAnyChildActive}
                      tooltip={t(item.title)}
                    >
                      {item.icon && <item.icon />}
                      <span>{t(item.title)}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {accessibleChildren.map((child) => {
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

          if (!checkAccess(item.access)) return null;

          const path = `/dashboard${item.path}`;
          return (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={pathname === path}
                tooltip={t(item.title)}
              >
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
