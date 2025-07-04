import { ThemeProviderProps } from "next-themes";
import { useEffect, useState } from "react";
import { Theme, ThemeProviderContext } from "./theme.context";
import { useLocalStorage } from "@/hooks/react-use";

export function ThemeContextProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  const [themePreset] = useLocalStorage("theme-preset", "default");
  const [radius] = useLocalStorage("radius", "0.5rem");

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    document.body.dataset.themePreset = themePreset;
  }, [themePreset]);

  useEffect(() => {
    document.body.style.setProperty("--radius", radius);
  }, [radius]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
