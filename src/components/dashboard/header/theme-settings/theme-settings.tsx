import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { ColorsSetting } from "./colors-setting";
import { RadiusSetting } from "./radius-setting";

export const ThemeSettings = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 px-4 py-3 space-y-3" align="end">
        <ColorsSetting />
        <RadiusSetting />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
