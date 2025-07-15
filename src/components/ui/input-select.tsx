"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "./spinner";

interface IProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  onInputChange?: (value: string) => void;
  inputValue?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export function InputSelect({
  options,
  value,
  onChange,
  onInputChange,
  inputValue,
  isLoading = false,
  disabled = false,
}: IProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between"
        >
          {value
            ? options.find((opt) => opt.value === value)?.label
            : "Tanlang..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <div className="flex items-center justify-between relative">
            <CommandInput
              onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange?.(e.target.value)
              }
              defaultValue={inputValue ?? ""}
              placeholder="Qidirish..."
            />
            {isLoading && (
              <div className="flex items-center justify-center absolute right-2 top-0 h-full">
                <Spinner
                  size="small"
                  className="w-4 h-4 text-muted-foreground"
                />
              </div>
            )}
          </div>
          <CommandList>
            <CommandGroup>
              {options.length === 0 && (
                <CommandEmpty>Natija topilmadi.</CommandEmpty>
              )}
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
