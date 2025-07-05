import { Select, SelectValue } from "@/components/ui/select";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "@/hooks/react-use";

interface ITheme {
  value: string;
  color: string;
  label: string;
}

const themes: ITheme[] = [
  {
    value: "default",
    label: "theme.default",
    color: "oklch(27.4% 0.008 286.03)",
  },
  {
    value: "rose-garden",
    label: "theme.rose-garden",
    color: "oklch(58.27% 0.2418 12.23)",
  },
  {
    value: "underground",
    label: "theme.underground",
    color: "oklch(53.15% 0.0694 156.19)",
  },
];

export const ColorsSetting = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useLocalStorage("theme-preset", themes[0].value);

  const handleChangeTheme = (theme: string) => {
    setTheme(theme);
    document.body.dataset.themePreset = theme;
  };

  return (
    <div>
      <DropdownMenuLabel className="text-sm">
        {t("theme.colors")}
      </DropdownMenuLabel>
      <Select onValueChange={handleChangeTheme} defaultValue={theme}>
        <SelectTrigger className="mt-2">
          <span
            style={{ background: themes.find((t) => t.value === theme)?.color }}
            className="w-2 h-2 rounded-full mr-1"
          />
          <SelectValue placeholder={t("theme.colors")} />
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme) => (
            <SelectItem
              key={theme.value}
              value={theme.value}
              className="text-sm"
            >
              <span
                style={{ background: theme.color }}
                className="w-2 h-2 rounded-full mr-1"
              />
              {t(theme.label)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
