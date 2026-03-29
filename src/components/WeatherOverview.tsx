import { Droplets, Heart, Thermometer, Wind } from "lucide-react";
import type { WeatherResponse } from "@/types/weather";
import { formatDay } from "@/utils/formatters";
import { formatTemperature, formatWindSpeed } from "@/utils/formatters";
import { normalizeWeatherIcon } from "@/utils/weatherIcons";
import { HistoricalDatePicker } from "./HistoricalDatePicker";
import { MetricCard } from "./MetricCard";
import { LoadingSkeleton } from "./LoadingSkeleton";

interface WeatherOverviewProps {
  weather?: WeatherResponse;
  isLoading: boolean;
  isFetching: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  historicalDate: string;
  onHistoricalDateChange: (value: string) => void;
}

export function WeatherOverview({
  weather,
  isLoading,
  isFetching,
  isFavorite,
  onToggleFavorite,
  historicalDate,
  onHistoricalDateChange,
}: WeatherOverviewProps) {
  if (isLoading || !weather) {
    return (
      <section className="panel p-5 sm:p-6">
        <LoadingSkeleton className="h-8 w-48" />
        <LoadingSkeleton className="mt-6 h-20 w-40" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <LoadingSkeleton key={index} className="h-28" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="panel p-5 sm:p-6">
      <HistoricalDatePicker value={historicalDate} onChange={onHistoricalDateChange} />

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="mt-6">
          <p className="muted text-sm">
            {weather.location.name}, {weather.location.country}
          </p>
          <p className="mt-2 text-sm font-medium text-skyGlow">
            {historicalDate ? `Historical weather for ${formatDay(historicalDate)}` : "Live conditions"}
          </p>
          <div className="mt-4 flex items-end gap-4">
            <div>
              <p className="text-6xl font-semibold tracking-tight">
                {formatTemperature(weather.current.temp_c)}
              </p>
              <p className="mt-2 text-sm muted">
                Feels like {formatTemperature(weather.current.feelslike_c)}
              </p>
            </div>
            <div className="rounded-[24px] bg-[rgb(var(--bg-soft))] p-3">
              <img
                src={normalizeWeatherIcon(weather.current.condition.icon)}
                alt={weather.current.condition.text}
                className="h-16 w-16 animate-float"
              />
            </div>
          </div>
          <p className="mt-3 text-base font-medium">{weather.current.condition.text}</p>
        </div>

        <button
          type="button"
          onClick={onToggleFavorite}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
            isFavorite
              ? "bg-slateNight text-white dark:bg-white dark:text-slateNight"
              : "bg-[rgb(var(--bg-soft))] hover:bg-[rgb(var(--bg-soft))]/80"
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          {isFavorite ? "Saved" : "Save city"}
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Feels like"
          value={formatTemperature(weather.current.feelslike_c)}
          icon={<Thermometer className="h-4 w-4" />}
        />
        <MetricCard
          label="Humidity"
          value={`${weather.current.humidity}%`}
          icon={<Droplets className="h-4 w-4" />}
        />
        <MetricCard
          label="Wind speed"
          value={formatWindSpeed(weather.current.wind_kph)}
          icon={<Wind className="h-4 w-4" />}
        />
        <MetricCard
          label={historicalDate ? "Recorded" : "Updated"}
          value={
            historicalDate ? formatDay(historicalDate) : isFetching ? "Refreshing..." : "Live now"
          }
          icon={<Heart className="h-4 w-4" />}
        />
      </div>
    </section>
  );
}
