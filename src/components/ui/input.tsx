import * as React from "react";

import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { checkTelegramTokenQueryFn } from "@/api/queries";
import { useDebounce } from "@/hooks/use-debounce";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "data-success:ring-green-500/20 dark:data-success:ring-green-500/40 data-success:border-green-500",
        className
      )}
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
          value: data.botInfo?.username || "",
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
      aria-invalid={data && !data.isValid}
      data-success={data && data.isValid}
      disabled={isLoading}
    />
  );
}

export { Input, TelegramTokenInput };
