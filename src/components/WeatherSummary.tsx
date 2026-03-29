import { Sparkles } from "lucide-react";
import type { WeatherResponse } from "@/types/weather";
import { buildWeatherSummary } from "@/utils/weatherSummary";
import { LoadingSkeleton } from "./LoadingSkeleton";

interface WeatherSummaryProps {
  weather?: WeatherResponse;
  isLoading: boolean;
}

export function WeatherSummary({ weather, isLoading }: WeatherSummaryProps) {
  if (isLoading || !weather) {
    return (
      <section className="panel p-5 sm:p-6">
        <LoadingSkeleton className="h-8 w-44" />
        <LoadingSkeleton className="mt-5 h-28 w-full" />
      </section>
    );
  }

  return (
    <section className="panel p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-[rgb(var(--bg-soft))] p-3">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Weather summary</h2>
          <p className="mt-1 text-sm muted">A natural-language read on current conditions.</p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 muted">{buildWeatherSummary(weather)}</p>
    </section>
  );
}
