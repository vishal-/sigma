import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Command } from "cmdk";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search options...",
  emptyText = "No option found.",
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-200 font-normal",
            !value && "text-slate-500",
            className
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-slate-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[200px] p-0 border-slate-800 bg-slate-900 shadow-2xl" align="start">
        <Command className="overflow-hidden rounded-2xl bg-slate-900 text-slate-100">
          <div className="flex items-center border-b border-slate-800 px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-slate-400" />
            <Command.Input
              placeholder={searchPlaceholder}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>
          <Command.List className="max-h-60 overflow-y-auto p-1 text-sm">
            <Command.Empty className="py-6 text-center text-xs text-slate-400">
              {emptyText}
            </Command.Empty>
            <Command.Group>
              {options.map((option) => (
                <Command.Item
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onChange?.(option.value === value ? "" : option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none hover:bg-slate-800 hover:text-white aria-selected:bg-slate-800 aria-selected:text-white transition-colors"
                  )}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-primary",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
