import type { ForecastHour, HistoricalWeatherResponse, WeatherResponse } from "@/types/weather";

function getRepresentativeHour(hours: ForecastHour[], fallbackDate: string) {
  const middayHour = hours.find((hour) => new Date(hour.time).getHours() === 12);

  if (middayHour) {
    return middayHour;
  }

  return (
    hours[Math.floor(hours.length / 2)] ?? {
      time: `${fallbackDate} 12:00`,
      temp_c: 0,
      feelslike_c: 0,
      chance_of_rain: 0,
      wind_kph: 0,
      condition: {
        text: "Unavailable",
        icon: "",
        code: 0,
      },
    }
  );
}

export function adaptHistoricalWeather(history: HistoricalWeatherResponse): WeatherResponse {
  const forecastDay = history.forecast.forecastday[0];
  const representativeHour = getRepresentativeHour(forecastDay?.hour ?? [], forecastDay?.date ?? "");

  return {
    location: history.location,
    current: {
      temp_c: forecastDay?.day.avgtemp_c ?? representativeHour.temp_c,
      feelslike_c: representativeHour.feelslike_c ?? forecastDay?.day.avgtemp_c ?? 0,
      humidity: Math.round(forecastDay?.day.avghumidity ?? 0),
      wind_kph: representativeHour.wind_kph ?? forecastDay?.day.maxwind_kph ?? 0,
      is_day: representativeHour.is_day ?? 1,
      condition: representativeHour.condition ?? forecastDay.day.condition,
      last_updated: representativeHour.time,
    },
    forecast: history.forecast,
  };
}
