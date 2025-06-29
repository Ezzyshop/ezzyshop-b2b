import { DashboardSidebar } from "@/components/dashboard/sidebar/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ShopContextProvider } from "@/contexts";
import { UserContextProvider } from "@/contexts/user-context/user.context-provider";
import { PropsWithChildren } from "react";

export const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <UserContextProvider>
      <ShopContextProvider>
        <SidebarProvider>
          <DashboardSidebar />
          <div className="flex-1 p-4">{children}</div>
        </SidebarProvider>
      </ShopContextProvider>
    </UserContextProvider>
  );
};
