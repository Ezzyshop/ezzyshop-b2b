import { Header } from "@/components/dashboard/header/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ShopContextProvider } from "@/contexts";
import { PermissionContextProvider } from "@/contexts/permission-context";
import { UserContextProvider } from "@/contexts/user-context/user.context-provider";
import { PropsWithChildren } from "react";

export const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <UserContextProvider>
      <ShopContextProvider>
        <PermissionContextProvider>
          <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
              <Header />
              <div className="flex-1 p-4">{children}</div>
            </SidebarInset>
          </SidebarProvider>
        </PermissionContextProvider>
      </ShopContextProvider>
    </UserContextProvider>
  );
};
