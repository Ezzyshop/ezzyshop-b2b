import { ChevronsUpDown, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useShopContext, useUserContext } from "@/contexts";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import { getAllShopsQueryFn } from "@/api/queries/shops.query";
import { UserRoles } from "@/lib/enums";
import { IShop } from "@/features/moderator/shops/utils";
import { IUserShop } from "@/lib/interfaces";

const shopToUserShop = (shop: IShop): IUserShop => ({
  _id: shop._id,
  name: shop.name,
  logo: shop.logo ?? null,
  plan: { _id: shop.plan._id, name: shop.plan.name },
});

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const { user } = useUserContext();
  const { activeShop, setActiveShop } = useShopContext();

  const isSuperAdmin = user.roles.includes(UserRoles.SuperAdmin);

  const { data: allShopsData } = useQuery({
    queryKey: ["all-shops-switcher"],
    queryFn: () => getAllShopsQueryFn({ limit: 200 }),
    enabled: isSuperAdmin,
  });

  const allShops = allShopsData?.data ?? [];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-full">
                <Avatar>
                  <AvatarImage
                    src={activeShop.logo ? activeShop.logo : ""}
                    className="rounded-full"
                  />
                  <AvatarFallback>
                    {activeShop.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeShop.name}</span>
                <span className="truncate text-xs">{activeShop.plan.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {isSuperAdmin
              ? allShops
                  .filter((shop) => shop._id !== activeShop._id)
                  .map((shop) => (
                    <DropdownMenuItem
                      key={shop._id}
                      onClick={() => setActiveShop(shopToUserShop(shop))}
                      className="gap-2 p-2"
                    >
                      <div className="flex size-6 items-center justify-center rounded-md border">
                        <Avatar>
                          <AvatarImage
                            src={shop.logo ?? ""}
                            className="rounded-full object-cover"
                          />
                          <AvatarFallback>
                            {shop.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      {shop.name}
                    </DropdownMenuItem>
                  ))
              : user.shops
                  .filter(({ shop }) => shop._id !== activeShop._id)
                  .map(({ shop: currentShop }) => (
                    <DropdownMenuItem
                      key={currentShop._id}
                      onClick={() => setActiveShop(currentShop)}
                      className="gap-2 p-2"
                    >
                      <div className="flex size-6 items-center justify-center rounded-md border">
                        <Avatar>
                          <AvatarImage
                            src={currentShop.logo ?? ""}
                            className="rounded-full object-cover"
                          />
                          <AvatarFallback>
                            {currentShop.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      {currentShop.name}
                    </DropdownMenuItem>
                  ))}
            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 p-2" asChild>
              <Link to="/register/create-shop">
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">
                  Do'kon qo'shish
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
