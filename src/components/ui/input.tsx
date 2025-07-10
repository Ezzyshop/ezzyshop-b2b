import * as React from "react";

import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { checkTelegramTokenQueryFn } from "@/api/queries";
import { useDebounce } from "@/hooks/use-debounce";

function Input({
  className,
  type,
  value,
  onChange,
  ...props
}: React.ComponentProps<"input">) {
  const [displayValue, setDisplayValue] = React.useState<string>("");

  // Helper function to format number with commas
  const formatNumber = (num: string): string => {
    // Remove all non-digit characters
    const numStr = num.replace(/\D/g, "");
    if (!numStr) return "";

    // Add thousand separators
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Helper function to get raw number value
  const getRawValue = (formattedValue: string): string => {
    return formattedValue.replace(/,/g, "");
  };

  // Handle value changes from parent
  React.useEffect(() => {
    if (type === "number" && value !== undefined) {
      const stringValue = String(value);
      if (stringValue !== getRawValue(displayValue)) {
        setDisplayValue(formatNumber(stringValue));
      }
    } else if (type !== "number" && value !== undefined) {
      setDisplayValue(String(value));
    }
  }, [value, type]);

  // Initialize display value
  React.useEffect(() => {
    if (type === "number" && value !== undefined) {
      setDisplayValue(formatNumber(String(value)));
    } else if (value !== undefined) {
      setDisplayValue(String(value));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (type === "number") {
      // Only allow digits and commas
      const cleanedValue = inputValue.replace(/[^\d,]/g, "");
      const formattedValue = formatNumber(cleanedValue);
      const rawValue = getRawValue(formattedValue);

      setDisplayValue(formattedValue);

      // Create a new event with the raw numeric value
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: rawValue,
          },
        };
        onChange(syntheticEvent);
      }
    } else {
      setDisplayValue(inputValue);
      onChange?.(e);
    }
  };

  const inputValue = type === "number" ? displayValue : value ?? "";

  return (
    <input
      type={type === "number" ? "text" : type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder:opacity-40",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "data-[success=true]:ring-green-500/20 dark:data-[success=true]:ring-green-500/40 data-[success=true]:border-green-500",
        className
      )}
      value={inputValue}
      onChange={handleChange}
      {...props}
    />
  );
}

function TelegramTokenInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  const [value, setValue] = React.useState<string>(props.value as string);

  const debouncedValue = useDebounce(value, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["telegram-token", debouncedValue],
    queryFn: () => checkTelegramTokenQueryFn(debouncedValue),
    enabled: !!debouncedValue,
  });

  React.useEffect(() => {
    if (data?.isValid) {
      props.onChange?.({
        target: {
          value: debouncedValue || "",
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [data]);

  return (
    <Input
      className={cn("w-full", className)}
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      aria-invalid={(data && !data.isValid) || props["aria-invalid"]}
      data-success={data && data.isValid}
      disabled={isLoading || props.disabled}
    />
  );
}

function InputWithPrefix({
  className,
  ...props
}: React.ComponentProps<"input"> & { prefix: string }) {
  return (
    <div className="relative">
      <Input type={"number"} className={cn("pr-12", className)} {...props} />
      <span className="text-muted-foreground text-sm absolute right-2 top-1/2 -translate-y-1/2">
        {props.prefix}
      </span>
    </div>
  );
}

export { Input, TelegramTokenInput, InputWithPrefix };
