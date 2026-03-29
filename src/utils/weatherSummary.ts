import type { WeatherResponse } from "@/types/weather";
import { formatTemperature, formatWindSpeed } from "./formatters";

export function buildWeatherSummary(weather: WeatherResponse) {
  const { current, forecast, location } = weather;
  const today = forecast.forecastday[0];
  const rainChance = today?.day.daily_chance_of_rain ?? 0;

  const rainSummary =
    rainChance > 65
      ? "Rain is fairly likely, so it is worth planning for wet conditions."
      : rainChance > 30
        ? "There is a moderate chance of rain later in the day."
        : "Rain chances look low for the next stretch.";

  const comfortSummary =
    current.feelslike_c > 28
      ? "It will feel quite warm outside."
      : current.feelslike_c < 8
        ? "The air will feel noticeably chilly."
        : "Conditions should feel fairly comfortable.";

  return `${location.name} is currently ${formatTemperature(current.temp_c)} with ${current.condition.text.toLowerCase()}. It feels like ${formatTemperature(current.feelslike_c)}, humidity is at ${current.humidity}%, and winds are moving around ${formatWindSpeed(current.wind_kph)}. ${comfortSummary} ${rainSummary}`;
}
