import { useState } from "react";
import { useEditorContext } from "@/contexts";
import { Toggle } from "@/components/ui/toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

const colorOptions = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FFA500",
  "#FFC0CB",
  "#00FFFF",
  "#FF00FF",
  "#A52A2A",
  "#000000",
  "#FFFFFF",
  "#808080",
];

export const TipTapColorExtension = () => {
  const { editor } = useEditorContext();
  const [color, setColor] = useState("#000000");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  if (!editor) {
    return null;
  }

  const handleChangeTextColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    editor.chain().focus().setColor(newColor).run();
  };

  const handleClickColor = (color: string) => {
    setColor(color);
    editor.chain().focus().setColor(color).run();
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Toggle size="sm" pressed={isPopoverOpen}>
          <div
            style={{ backgroundColor: color }}
            className="w-3 h-3 rounded-sm"
          />{" "}
          Rang <ChevronDown width={16} height={16} />
        </Toggle>
      </PopoverTrigger>

      <PopoverContent>
        <div className="grid grid-cols-6 gap-1">
          {colorOptions.map((color) => (
            <div
              style={{ backgroundColor: color }}
              key={color}
              className="w-6 h-6 rounded-md cursor-pointer"
              onClick={() => handleClickColor(color)}
            ></div>
          ))}
          <input
            type="color"
            value={color}
            onChange={handleChangeTextColor}
            className="col-span-4 w-full h-10 border-none cursor-pointer bg-inherit"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
