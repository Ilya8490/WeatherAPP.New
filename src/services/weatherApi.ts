import type {
  CitySearchResult,
  HistoricalWeatherResponse,
  WeatherResponse,
} from "@/types/weather";

const API_BASE_URL = "https://api.weatherapi.com/v1";
const API_PROXY_URL = "/api/weather";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function shouldUseClientSideApi() {
  return import.meta.env.DEV && Boolean(API_KEY);
}

async function request<T>(path: string, params: Record<string, string>) {
  if (shouldUseClientSideApi()) {
    const query = new URLSearchParams({
      key: API_KEY!,
      ...params,
    });

    const response = await fetch(`${API_BASE_URL}/${path}?${query.toString()}`);

    if (!response.ok) {
      throw new Error(`WeatherAPI request failed with status ${response.status}.`);
    }

    return (await response.json()) as T;
  }

  const query = new URLSearchParams({
    endpoint: path,
    ...params,
  });
  const response = await fetch(`${API_PROXY_URL}?${query.toString()}`);
  const data = (await response.json()) as { error?: { message?: string } | string };

  if (!response.ok) {
    const message =
      typeof data.error === "string"
        ? data.error
        : data.error?.message ?? `WeatherAPI request failed with status ${response.status}.`;

    throw new Error(message);
  }

  return data as T;
}

export function searchCities(query: string) {
  return request<CitySearchResult[]>("search.json", { q: query });
}

export function getWeatherForecast(city: string) {
  return request<WeatherResponse>("forecast.json", {
    q: city,
    days: "3",
    aqi: "no",
    alerts: "no",
  });
}

export function getHistoricalWeather(city: string, date: string) {
  return request<HistoricalWeatherResponse>("history.json", {
    q: city,
    dt: date,
  });
}
