import type { FavoriteCity } from "@/types/weather";

const FAVORITES_KEY = "weather-favorites";
const THEME_KEY = "weather-theme";

export function getStoredFavorites(): FavoriteCity[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(FAVORITES_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as FavoriteCity[];
  } catch {
    return [];
  }
}

export function setStoredFavorites(favorites: FavoriteCity[]) {
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function getStoredTheme(): "light" | "dark" | null {
  if (typeof window === "undefined") {
    return null;
  }

  const theme = window.localStorage.getItem(THEME_KEY);
  return theme === "light" || theme === "dark" ? theme : null;
}

export function setStoredTheme(theme: "light" | "dark") {
  window.localStorage.setItem(THEME_KEY, theme);
}
