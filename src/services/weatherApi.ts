import type { CitySearchResult, WeatherResponse } from "@/types/weather";

const API_BASE_URL = "https://api.weatherapi.com/v1";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function assertApiKey() {
  if (!API_KEY) {
    throw new Error("Missing WeatherAPI key. Add VITE_WEATHER_API_KEY to your environment.");
  }
}

async function request<T>(path: string, params: Record<string, string>) {
  assertApiKey();

  const query = new URLSearchParams({
    key: API_KEY,
    ...params,
  });

  const response = await fetch(`${API_BASE_URL}/${path}?${query.toString()}`);

  if (!response.ok) {
    throw new Error(`WeatherAPI request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
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
