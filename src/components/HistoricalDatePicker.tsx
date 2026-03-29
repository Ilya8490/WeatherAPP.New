import { CalendarDays, History } from "lucide-react";
import { getPastDateString, getTodayDateString } from "@/utils/date";

interface HistoricalDatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function HistoricalDatePicker({
  value,
  onChange,
}: HistoricalDatePickerProps) {
  const maxDate = getTodayDateString();

  return (
    <div className="rounded-[24px] bg-[rgb(var(--bg-soft))] p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-sm font-medium">
            <CalendarDays className="h-4 w-4" />
            Weather history
          </div>
          <p className="text-sm muted">
            Pick a past date to switch from live conditions to recorded weather for that day.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="date"
            value={value}
            max={maxDate}
            onChange={(event) => onChange(event.target.value)}
            className="min-h-11 rounded-full border border-[rgb(var(--border))]/70 bg-[rgb(var(--bg-panel))] px-4 text-sm outline-none transition focus:border-skyGlow"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onChange("")}
              className={`rounded-full px-3 py-2 text-sm transition ${
                value === ""
                  ? "bg-slateNight text-white dark:bg-white dark:text-slateNight"
                  : "bg-[rgb(var(--bg-panel))] hover:bg-white"
              }`}
            >
              Live
            </button>
            <button
              type="button"
              onClick={() => onChange(getPastDateString(1))}
              className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--bg-panel))] px-3 py-2 text-sm transition hover:bg-white"
            >
              <History className="h-4 w-4" />
              Yesterday
            </button>
            <button
              type="button"
              onClick={() => onChange(getPastDateString(7))}
              className="rounded-full bg-[rgb(var(--bg-panel))] px-3 py-2 text-sm transition hover:bg-white"
            >
              Last week
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
