import { useQuery } from "@tanstack/react-query";
import { searchCities } from "@/services/weatherApi";
import { useDebounce } from "./useDebounce";

export function useWeatherSearch(query: string) {
  const debouncedQuery = useDebounce(query, 450);
  const shouldSearch = debouncedQuery.trim().length >= 2;

  const searchQuery = useQuery({
    queryKey: ["city-search", debouncedQuery],
    queryFn: () => searchCities(debouncedQuery),
    enabled: shouldSearch,
    staleTime: 1000 * 60 * 60,
  });

  return {
    results: searchQuery.data ?? [],
    isLoading: searchQuery.isLoading || searchQuery.isFetching,
    hasSearched: shouldSearch,
  };
}
