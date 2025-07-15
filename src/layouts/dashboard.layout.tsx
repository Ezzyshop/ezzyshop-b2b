import { Header } from "@/components/dashboard/header/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar/sidebar";
import { ShopContextProvider } from "@/contexts";
import { UserContextProvider } from "@/contexts/user-context/user.context-provider";
import { PropsWithChildren } from "react";

export const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <UserContextProvider>
      <ShopContextProvider>
        <SidebarProvider>
          <DashboardSidebar />
          <SidebarInset>
            <Header />
            <div className="flex-1 p-4">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </ShopContextProvider>
    </UserContextProvider>
  );
};
