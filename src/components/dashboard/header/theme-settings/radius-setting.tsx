import { Button } from "@/components/ui/button/button";
import { useLocalStorage } from "@/hooks/react-use";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useTranslation } from "react-i18next";

const radiuses = [
  {
    value: "0.5rem",
    label: "SM",
  },
  {
    value: "0.75rem",
    label: "MD",
  },
  {
    value: "1rem",
    label: "LG",
  },
  {
    value: "1.5rem",
    label: "XL",
  },
];

export const RadiusSetting = () => {
  const { t } = useTranslation();
  const [radius, setRadius] = useLocalStorage("radius", "sm");

  const handleChangeRadius = (radius: string) => {
    setRadius(radius);
    document.body.style.setProperty("--radius", radius);
  };

  return (
    <div>
      <DropdownMenuLabel className="text-sm">
        {t("theme.radius")}
      </DropdownMenuLabel>
      <div className="flex gap-2 justify-between mt-2">
        {radiuses.map((radiusItem) => (
          <Button
            variant={radiusItem.value === radius ? "default" : "outline"}
            key={radiusItem.value}
            size="icon"
            className="cursor-pointer"
            onClick={() => handleChangeRadius(radiusItem.value)}
          >
            {radiusItem.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
