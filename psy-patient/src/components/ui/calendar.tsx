"use client";

import * as React from "react";
import { DayPicker, DayPickerProps } from "react-day-picker";
import type { DayPickerSingleProps } from "react-day-picker"; // opcional; no imprescindible
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { addMonths, format } from "date-fns";
import { es } from "date-fns/locale";
import type { Locale } from "date-fns";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  mode,
  disabled,
  locale: dpLocale,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date>(props.month ?? new Date());

  const goPrev = () => setMonth((m) => addMonths(m, -1));
  const goNext = () => setMonth((m) => addMonths(m, 1));

  const effectiveLocale = (dpLocale ?? es) as Locale;
  const monthLabel = React.useMemo(
    () => format(month, "LLLL yyyy", { locale: effectiveLocale }),
    [month, effectiveLocale]
  );

  // 👇 narrow local para no pelear con las uniones del tipo DayPickerProps
  const selectedAny = (props as any).selected;
  const onSelectAny = (props as any).onSelect;

  return (
    <div className={cn("p-3", className)}>
      <div className="mb-1 flex items-center justify-between px-2">
        <div className="text-sm font-medium capitalize">{monthLabel}</div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Mes anterior"
            onClick={goPrev}
            className="h-7 w-7 p-0 bg-transparent rounded-md opacity-60 hover:opacity-100 transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Mes siguiente"
            onClick={goNext}
            className="h-7 w-7 p-0 bg-transparent rounded-md opacity-60 hover:opacity-100 transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <DayPicker
        mode={mode ?? "single"}
        // 👇 evitar errores de TS por la unión de tipos (single/range/multiple)
        selected={selectedAny}
        onSelect={onSelectAny}
        disabled={disabled}
        month={month}
        onMonthChange={setMonth}
        showOutsideDays={showOutsideDays}
        locale={dpLocale}
        classNames={{
          months: "flex flex-col space-y-3",
          month: "space-y-3",
          table: "w-full border-collapse",
          caption: "hidden",
          caption_label: "hidden",
          nav: "hidden",

          head_row: "grid grid-cols-7",
          head_cell:
            "w-9 text-[0.8rem] font-normal text-muted-foreground rounded-md text-center",

          row: "grid grid-cols-7 mt-2",
          cell: "relative h-9 w-9 p-0 text-center text-sm",

          day: "h-9 w-9 p-0 rounded-md text-sm font-normal text-center leading-none aria-selected:opacity-100",
          day_selected:
            "ring-1 ring-primary text-primary bg-primary/10 hover:bg-primary/15 focus-visible:ring-2 focus-visible:ring-primary",
          day_today: "font-medium",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled:
            "opacity-40 text-muted-foreground line-through cursor-not-allowed",
          day_hidden: "invisible",

          ...classNames,
        }}
        modifiersClassNames={{
          selected:
            "ring-1 ring-primary text-primary bg-primary/10 hover:bg-primary/15 focus-visible:ring-2 focus-visible:ring-primary",
          disabled:
            "opacity-40 text-muted-foreground line-through cursor-not-allowed",
          outside: "text-muted-foreground opacity-50",
          today: "font-medium",
          ...props.modifiersClassNames,
        }}
        {...(props as DayPickerProps)}
      />
    </div>
  );
}

Calendar.displayName = "Calendar";
export default Calendar;
