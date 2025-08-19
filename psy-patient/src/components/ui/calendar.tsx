"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { addMonths, format } from "date-fns";
import { es } from "date-fns/locale";
import type { Locale } from "date-fns";

// Tomamos los tipos originales una sola vez
type DPProps = React.ComponentProps<typeof DayPicker>;

/**
 * Wrapper SOLO para selección única (single).
 * Fijamos internamente el mode="single" y exponemos solo lo necesario,
 * incluyendo 'month' como opcional para inicializar el mes mostrado.
 */
export type CalendarSingleProps = Omit<
  DPProps,
  "mode" | "month" | "selected" | "onSelect"
> & {
  mode?: "single"; // opcional, pero el wrapper usará "single" siempre
  selected?: Date | undefined;
  onSelect?: (date: Date | undefined) => void;
  month?: Date;

  // Reexponemos props útiles con sus tipos originales
  disabled?: DPProps["disabled"];
  locale?: DPProps["locale"];
  className?: DPProps["className"];
  classNames?: DPProps["classNames"];
  modifiersClassNames?: DPProps["modifiersClassNames"];
  showOutsideDays?: DPProps["showOutsideDays"];
};

export default function Calendar({
  className,
  classNames,
  modifiersClassNames,
  showOutsideDays = true,
  locale: dpLocale,
  selected,
  onSelect,
  disabled,
  month: monthProp,
  ...rest
}: CalendarSingleProps) {
  // Estado del mes controlado por el wrapper (con soporte a prop inicial)
  const [month, setMonth] = React.useState<Date>(monthProp ?? new Date());

  // Header: navegar meses
  const goPrev = () => setMonth((m) => addMonths(m, -1));
  const goNext = () => setMonth((m) => addMonths(m, 1));

  // date-fns requiere Locale completo (RDP acepta Partial<Locale>)
  const effectiveLocale = (dpLocale ?? es) as Locale;
  const monthLabel = React.useMemo(
    () => format(month, "LLLL yyyy", { locale: effectiveLocale }),
    [month, effectiveLocale]
  );

  return (
    <div className={cn("p-3", className)}>
      {/* Header propio: “Mes  ‹ ›” */}
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
        /* 🔒 Fijamos modo single y pasamos selección tipada como Date */
        mode="single"
        selected={selected}
        onSelect={onSelect}
        disabled={disabled}
        month={month}
        onMonthChange={setMonth}
        showOutsideDays={showOutsideDays}
        locale={dpLocale}
        /* Estilos base (no usamos flex/grid en 'day' para no romper la grilla) */
        classNames={{
          months: "flex flex-col space-y-3",
          month: "space-y-3",
          table: "w-full border-collapse",

          // Ocultamos caption/nav nativos (ya tenemos header propio)
          caption: "hidden",
          caption_label: "hidden",
          nav: "hidden",

          head_row: "grid grid-cols-7",
          head_cell:
            "w-9 text-[0.8rem] font-normal text-muted-foreground rounded-md text-center",

          row: "grid grid-cols-7 mt-2",
          cell: "relative h-9 w-9 p-0 text-center text-sm",

          // Día base + variantes (seguros)
          day: "h-9 w-9 p-0 rounded-md text-sm font-normal text-center leading-none aria-selected:opacity-100",

          // Seleccionado: outline suave (cambia por sólido si prefieres)
          day_selected:
            "ring-1 ring-primary text-primary bg-primary/10 hover:bg-primary/15 focus-visible:ring-2 focus-visible:ring-primary",

          day_today: "font-medium",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled:
            "opacity-40 text-muted-foreground line-through cursor-not-allowed",
          day_hidden: "invisible",

          ...classNames,
        }}
        /* Refuerzo por modifiers (por si cambia el mapeo interno) */
        modifiersClassNames={{
          selected:
            "ring-1 ring-primary text-primary bg-primary/10 hover:bg-primary/15 focus-visible:ring-2 focus-visible:ring-primary",
          disabled:
            "opacity-40 text-muted-foreground line-through cursor-not-allowed",
          outside: "text-muted-foreground opacity-50",
          today: "font-medium",
          ...modifiersClassNames,
        }}
        {...rest}
      />
    </div>
  );
}
