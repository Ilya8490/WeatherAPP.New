import { useEffect, useState } from "react";
import type { FavoriteCity } from "@/types/weather";
import { getStoredFavorites, setStoredFavorites } from "@/utils/storage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteCity[]>(() => getStoredFavorites());

  useEffect(() => {
    setStoredFavorites(favorites);
  }, [favorites]);

  const toggleFavorite = (city: FavoriteCity) => {
    setFavorites((current) => {
      const exists = current.some((item) => item.name === city.name);
      if (exists) {
        return current.filter((item) => item.name !== city.name);
      }

      return [city, ...current];
    });
  };

  const isFavorite = (name: string) => favorites.some((city) => city.name === name);

  return { favorites, toggleFavorite, isFavorite };
}
