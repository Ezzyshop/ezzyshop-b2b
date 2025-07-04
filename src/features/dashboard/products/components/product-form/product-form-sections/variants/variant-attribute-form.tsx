import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface IProps {
  onAdd: (key: string, value: string) => void;
}

export const VariantAttributeForm = ({ onAdd }: IProps) => {
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const handleAdd = () => {
    if (key.trim() && value.trim()) {
      onAdd(key.trim(), value.trim());
      setKey("");
      setValue("");
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Attribute name"
        maxLength={50}
        className="flex-1"
      />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Attribute value"
        maxLength={50}
        className="flex-1"
      />
      <Button
        type="button"
        size="sm"
        onClick={handleAdd}
        disabled={!key.trim() || !value.trim()}
      >
        Add
      </Button>
    </div>
  );
};
