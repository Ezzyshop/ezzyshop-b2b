import { useSidebar } from "@/components/ui/sidebar/sidebar";
import { LanguageSwitcher } from "./language-switcher";
import { Notification } from "./notification";
import { ThemeChanger } from "./theme-changer";
import { ThemeSettings } from "./theme-settings/theme-settings";
import { Button } from "@/components/ui/button/button";
import { PanelRightIcon } from "lucide-react";

export const Header = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background/50 flex gap-2 items-center justify-between backdrop-blur-xl z-50 sticky top-0 px-4 py-2 drop-shadow-blue-50">
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <PanelRightIcon />
      </Button>
      <div className="flex items-center gap-2">
        <Notification />
        <ThemeSettings />
        <LanguageSwitcher />
        <ThemeChanger />
      </div>
    </header>
  );
};
