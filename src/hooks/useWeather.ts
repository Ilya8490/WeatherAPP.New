import { useQuery } from "@tanstack/react-query";
import { getWeatherForecast } from "@/services/weatherApi";

export function useWeather(city: string) {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => getWeatherForecast(city),
    enabled: Boolean(city.trim()),
  });
}
