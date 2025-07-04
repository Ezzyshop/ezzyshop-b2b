import { LanguageSwitcher } from "./language-switcher";
import { Notification } from "./notification";
import { ThemeChanger } from "./theme-changer";

export const Header = () => {
  return (
    <header className="bg-background/50 flex gap-2 items-center justify-end backdrop-blur-xl z-50 sticky top-0 px-4 py-2 drop-shadow-blue-50">
      <Notification />
      <LanguageSwitcher />
      <ThemeChanger />
    </header>
  );
};
