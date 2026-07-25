import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isToday,
} from "date-fns";
import { cn } from "@/lib/utils";

export interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

export function Calendar({ selected, onSelect, className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(selected || new Date());

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days: Date[] = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={cn("p-3 bg-slate-900 rounded-2xl border border-slate-800 text-slate-100 w-[280px]", className)}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="font-bold text-sm text-white">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {weekDays.map((d) => (
          <span key={d} className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            {d}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((d, i) => {
          const isSelected = selected ? isSameDay(d, selected) : false;
          const isCurrentMonth = isSameMonth(d, currentMonth);

          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect?.(d)}
              className={cn(
                "h-8 w-8 text-xs font-semibold rounded-xl flex items-center justify-center transition cursor-pointer",
                !isCurrentMonth && "text-slate-600",
                isCurrentMonth && !isSelected && "text-slate-300 hover:bg-slate-800 hover:text-white",
                isToday(d) && !isSelected && "border border-primary text-primary font-bold",
                isSelected && "bg-primary text-primary-foreground font-bold shadow-md shadow-indigo-600/30"
              )}
            >
              {format(d, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
