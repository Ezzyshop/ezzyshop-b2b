import { AppSidebar } from "@/components/moderator/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserContextProvider } from "@/contexts/user-context/user.context-provider";
import { PropsWithChildren } from "react";

export const ModeratorLayout = ({ children }: PropsWithChildren) => {
  return (
    <UserContextProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 p-4">{children}</div>
      </SidebarProvider>
    </UserContextProvider>
  );
};
