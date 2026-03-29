import { useEffect, useState } from "react";
import { CloudSun, MapPinned, Search } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { WeatherOverview } from "@/components/WeatherOverview";
import { ForecastSection } from "@/components/ForecastSection";
import { FavoritesBar } from "@/components/FavoritesBar";
import { WeatherSummary } from "@/components/WeatherSummary";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WeatherShell } from "@/components/WeatherShell";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { useFavorites } from "@/hooks/useFavorites";
import { useWeather } from "@/hooks/useWeather";
import { useWeatherSearch } from "@/hooks/useWeatherSearch";
import type { CitySearchResult } from "@/types/weather";

const DEFAULT_CITY = "Berlin";

function App() {
  const [selectedCity, setSelectedCity] = useState<string>(DEFAULT_CITY);
  const [searchInput, setSearchInput] = useState<string>(DEFAULT_CITY);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const {
    data: weather,
    isLoading: isWeatherLoading,
    isFetching: isWeatherFetching,
    error: weatherError,
  } = useWeather(selectedCity);
  const {
    results,
    isLoading: isSearchLoading,
    hasSearched,
  } = useWeatherSearch(searchInput);

  useEffect(() => {
    if (favorites.length === 0) {
      return;
    }

    const hasSelected = favorites.some((favorite) => favorite.name === selectedCity);
    if (!hasSelected && selectedCity === DEFAULT_CITY) {
      return;
    }

    if (!hasSelected && !weather) {
      const nextFavorite = favorites[0];
      setSelectedCity(nextFavorite.name);
      setSearchInput(nextFavorite.name);
    }
  }, [favorites, selectedCity, weather]);

  const handleSelectCity = (city: CitySearchResult) => {
    const cityLabel = `${city.name}${city.country ? `, ${city.country}` : ""}`;
    setSelectedCity(cityLabel);
    setSearchInput(cityLabel);
  };

  const handleSelectFavorite = (cityName: string) => {
    setSelectedCity(cityName);
    setSearchInput(cityName);
  };

  const favoriteCity = weather
    ? {
        id: `${weather.location.name}-${weather.location.country}`,
        name: `${weather.location.name}, ${weather.location.country}`,
        region: weather.location.region,
        country: weather.location.country,
      }
    : null;

  return (
    <WeatherShell>
      <section className="relative overflow-hidden rounded-[32px] border border-white/20 bg-slateNight px-5 py-6 text-white shadow-panel sm:px-8 sm:py-8">
        <div className="absolute inset-0 bg-hero-grid opacity-90" />
        <div className="absolute -right-10 top-8 h-28 w-28 rounded-full bg-skyGlow/20 blur-3xl sm:h-40 sm:w-40" />
        <div className="absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-aurora/20 blur-3xl sm:h-36 sm:w-36" />

        <div className="relative flex flex-col gap-8">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/70">
                <CloudSun className="h-3.5 w-3.5" />
                SkyCast
              </div>
              <div className="max-w-xl space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Track weather patterns with a calm, instant global view.
                </h1>
                <p className="max-w-lg text-sm text-white/70 sm:text-base">
                  Search any city, compare saved locations, and get a quick read on the
                  conditions before you head out.
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <SearchBar
                value={searchInput}
                onChange={setSearchInput}
                results={results}
                isLoading={isSearchLoading}
                hasSearched={hasSearched}
                onSelect={handleSelectCity}
              />
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                <span className="inline-flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Debounced global city search
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPinned className="h-4 w-4" />
                  Favorites synced locally
                </span>
              </div>
            </div>

            <FavoritesBar
              favorites={favorites}
              activeCity={favoriteCity?.name ?? selectedCity}
              onSelect={handleSelectFavorite}
              onRemove={toggleFavorite}
            />
          </div>
        </div>
      </section>

      {weatherError ? (
        <ErrorState
          title="Weather data is unavailable"
          description={
            weatherError instanceof Error
              ? weatherError.message
              : "Please check your API key and try another city."
          }
        />
      ) : null}

      {!weather && !isWeatherLoading && !weatherError ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <WeatherOverview
              weather={weather}
              isLoading={isWeatherLoading}
              isFetching={isWeatherFetching}
              isFavorite={favoriteCity ? isFavorite(favoriteCity.name) : false}
              onToggleFavorite={() => {
                if (favoriteCity) {
                  toggleFavorite(favoriteCity);
                }
              }}
            />
            <ForecastSection weather={weather} isLoading={isWeatherLoading} />
          </div>

          <div className="space-y-6">
            <WeatherSummary weather={weather} isLoading={isWeatherLoading} />
          </div>
        </div>
      )}
    </WeatherShell>
  );
}

export default App;
