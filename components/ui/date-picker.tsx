import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-200",
            !date && "text-slate-500",
            className
          )}
        >
          <CalendarIcon className="mr-2.5 h-4 w-4 text-primary" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-slate-800 bg-slate-900 shadow-2xl" align="start">
        <Calendar
          selected={date}
          onSelect={(d) => {
            onDateChange?.(d);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
