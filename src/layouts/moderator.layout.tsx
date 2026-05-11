import { AppSidebar } from "@/components/moderator/sidebar/moderator-sidebar";
import { Button } from "@/components/ui/button/button";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { UserContextProvider } from "@/contexts/user-context/user.context-provider";
import { PanelRightIcon } from "lucide-react";
import { PropsWithChildren } from "react";

const ModeratorSidebarToggle = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
      <PanelRightIcon />
    </Button>
  );
};

export const ModeratorLayout = ({ children }: PropsWithChildren) => {
  return (
    <UserContextProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 p-4 md:w-[80vw]">
          <header className="bg-background/50 flex items-center backdrop-blur-xl z-10 sticky top-0 py-2">
            <ModeratorSidebarToggle />
          </header>
          {children}
        </div>
      </SidebarProvider>
    </UserContextProvider>
  );
};
