import { useQuery } from "@tanstack/react-query";
import { getHistoricalWeather } from "@/services/weatherApi";

export function useHistoricalWeather(city: string, date: string) {
  return useQuery({
    queryKey: ["historicalWeather", city, date],
    queryFn: () => getHistoricalWeather(city, date),
    enabled: Boolean(city.trim() && date.trim()),
    staleTime: 1000 * 60 * 30,
  });
}
