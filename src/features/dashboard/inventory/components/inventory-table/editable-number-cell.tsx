import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface IProps {
  value: number | null | undefined;
  onCommit: (next: number | null) => void;
  isSaving?: boolean;
  allowNull?: boolean;
  min?: number;
  suffix?: string;
  placeholder?: string;
  integer?: boolean;
}

const formatNumber = (raw: string): string => {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const stripFormat = (formatted: string): string => formatted.replace(/,/g, "");

export const EditableNumberCell = ({
  value,
  onCommit,
  isSaving,
  allowNull = false,
  min = 0,
  suffix,
  placeholder = "—",
  integer = false,
}: IProps) => {
  const initial = value === null || value === undefined ? "" : String(value);
  const [display, setDisplay] = useState(formatNumber(initial));
  const [focused, setFocused] = useState(false);
  const lastCommittedRef = useRef(initial);

  useEffect(() => {
    if (focused) return;
    const next = value === null || value === undefined ? "" : String(value);
    lastCommittedRef.current = next;
    setDisplay(formatNumber(next));
  }, [value, focused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^\d]/g, "");
    setDisplay(formatNumber(cleaned));
  };

  const handleBlur = () => {
    setFocused(false);
    const raw = stripFormat(display);

    if (raw === "") {
      if (allowNull && lastCommittedRef.current !== "") {
        lastCommittedRef.current = "";
        onCommit(null);
      } else if (!allowNull) {
        setDisplay(formatNumber(lastCommittedRef.current));
      }
      return;
    }

    const parsed = integer ? parseInt(raw, 10) : Number(raw);
    if (Number.isNaN(parsed) || parsed < min) {
      setDisplay(formatNumber(lastCommittedRef.current));
      return;
    }

    if (String(parsed) === lastCommittedRef.current) return;

    lastCommittedRef.current = String(parsed);
    onCommit(parsed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      setDisplay(formatNumber(lastCommittedRef.current));
      e.currentTarget.blur();
    }
  };

  return (
    <div className="relative inline-flex items-center w-full">
      <input
        type="text"
        inputMode="numeric"
        value={display}
        placeholder={placeholder}
        disabled={isSaving}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full min-w-0 rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-xs outline-none",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          suffix && "pr-10",
          isSaving && "pr-7"
        )}
      />
      {suffix && !isSaving && (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
          {suffix}
        </span>
      )}
      {isSaving && (
        <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 animate-spin text-muted-foreground" />
      )}
    </div>
  );
};
