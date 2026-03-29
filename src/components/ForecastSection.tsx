import type { WeatherResponse } from "@/types/weather";
import { formatDay, formatTemperature, formatTime, formatWindSpeed } from "@/utils/formatters";
import { normalizeWeatherIcon } from "@/utils/weatherIcons";
import { LoadingSkeleton } from "./LoadingSkeleton";

interface ForecastSectionProps {
  weather?: WeatherResponse;
  isLoading: boolean;
  isHistorical?: boolean;
}

export function ForecastSection({
  weather,
  isLoading,
  isHistorical = false,
}: ForecastSectionProps) {
  if (isLoading || !weather) {
    return (
      <section className="panel p-5 sm:p-6">
        <LoadingSkeleton className="h-8 w-44" />
        <div className="mt-6 flex gap-3 overflow-hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            <LoadingSkeleton key={index} className="h-36 min-w-[180px] flex-1" />
          ))}
        </div>
      </section>
    );
  }

  const hours =
    weather.forecast.forecastday[0]?.hour.filter((hour) => {
      const time = new Date(hour.time).getHours();
      return time >= 6 && time <= 21 && time % 3 === 0;
    }) ?? [];

  return (
    <section className="panel p-5 sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            {isHistorical ? "Historical breakdown" : "Short-term forecast"}
          </h2>
          <p className="mt-1 text-sm muted">
            {isHistorical
              ? "A replay of the selected day's conditions and hourly pattern."
              : "A quick scan of the next few hours and days."}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {weather.forecast.forecastday.map((day) => (
          <article key={day.date} className="rounded-[24px] bg-[rgb(var(--bg-soft))] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium muted">{formatDay(day.date)}</p>
                <p className="mt-2 text-xl font-semibold">
                  {formatTemperature(day.day.maxtemp_c)}
                </p>
                <p className="mt-1 text-sm muted">
                  Low {formatTemperature(day.day.mintemp_c)}
                </p>
              </div>
              <img
                src={normalizeWeatherIcon(day.day.condition.icon)}
                alt={day.day.condition.text}
                className="h-14 w-14"
              />
            </div>
            <p className="mt-4 text-sm">{day.day.condition.text}</p>
            <div className="mt-4 flex items-center justify-between text-xs muted">
              <span>Rain {day.day.daily_chance_of_rain}%</span>
              <span>{formatWindSpeed(day.day.maxwind_kph)}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="flex min-w-max gap-3">
          {hours.map((hour) => (
            <div
              key={hour.time}
              className="min-w-[132px] rounded-[22px] border border-[rgb(var(--border))]/60 bg-[rgb(var(--bg-panel))] p-4"
            >
              <p className="text-sm font-medium">{formatTime(hour.time)}</p>
              <img
                src={normalizeWeatherIcon(hour.condition.icon)}
                alt={hour.condition.text}
                className="mt-3 h-10 w-10"
              />
              <p className="mt-3 text-xl font-semibold">{formatTemperature(hour.temp_c)}</p>
              <p className="mt-1 text-xs muted">{hour.chance_of_rain}% rain</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
