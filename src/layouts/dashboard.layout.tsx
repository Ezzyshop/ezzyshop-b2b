import { Header } from "@/components/dashboard/header/header";
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
          <div className="flex flex-col flex-1">
            <Header />
            <div className="flex-1 p-4 md:w-[82vw]">{children}</div>
          </div>
        </SidebarProvider>
      </ShopContextProvider>
    </UserContextProvider>
  );
};
