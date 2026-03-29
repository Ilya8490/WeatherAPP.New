import { LoaderCircle, Search } from "lucide-react";
import type { CitySearchResult } from "@/types/weather";
import { cn } from "@/utils/cn";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  results: CitySearchResult[];
  isLoading: boolean;
  hasSearched: boolean;
  onSelect: (city: CitySearchResult) => void;
}

export function SearchBar({
  value,
  onChange,
  results,
  isLoading,
  hasSearched,
  onSelect,
}: SearchBarProps) {
  return (
    <div className="relative">
      <label htmlFor="city-search" className="sr-only">
        Search cities
      </label>
      <div className="flex items-center gap-3 rounded-[24px] border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-xl transition duration-300 focus-within:border-white/30 focus-within:bg-white/15">
        <Search className="h-5 w-5 text-white/75" />
        <input
          id="city-search"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search cities worldwide"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/45 sm:text-base"
        />
        {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin text-white/75" /> : null}
      </div>

      <div
        className={cn(
          "absolute left-0 right-0 top-[calc(100%+0.75rem)] z-20 overflow-hidden rounded-[24px] border border-white/10 bg-slateNight/95 shadow-2xl backdrop-blur-xl transition-all duration-300",
          hasSearched ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {hasSearched && results.length > 0 ? (
          <ul className="max-h-80 overflow-y-auto p-2">
            {results.slice(0, 7).map((city) => (
              <li key={city.url}>
                <button
                  type="button"
                  onClick={() => onSelect(city)}
                  className="flex w-full items-center justify-between rounded-[18px] px-4 py-3 text-left transition hover:bg-white/10"
                >
                  <span className="text-sm font-medium text-white">
                    {city.name}, {city.country}
                  </span>
                  <span className="text-xs text-white/55">{city.region}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {hasSearched && !isLoading && results.length === 0 ? (
          <div className="px-4 py-5 text-sm text-white/60">No matching cities found.</div>
        ) : null}
      </div>
    </div>
  );
}
