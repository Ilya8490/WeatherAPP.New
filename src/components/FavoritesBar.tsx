import { Heart, Trash2 } from "lucide-react";
import type { FavoriteCity } from "@/types/weather";

interface FavoritesBarProps {
  favorites: FavoriteCity[];
  activeCity: string;
  onSelect: (name: string) => void;
  onRemove: (city: FavoriteCity) => void;
}

export function FavoritesBar({
  favorites,
  activeCity,
  onSelect,
  onRemove,
}: FavoritesBarProps) {
  return (
    <div className="rounded-[28px] border border-white/12 bg-white/10 p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">Saved cities</p>
          <p className="text-xs text-white/60">Jump instantly between your go-to locations.</p>
        </div>
        <Heart className="h-4 w-4 text-white/70" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {favorites.length > 0 ? (
          favorites.map((city) => (
            <div
              key={city.id}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 p-1"
            >
              <button
                type="button"
                onClick={() => onSelect(city.name)}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  activeCity === city.name ? "bg-white text-slateNight" : "text-white/75 hover:bg-white/10"
                }`}
              >
                {city.name}
              </button>
              <button
                type="button"
                onClick={() => onRemove(city)}
                className="rounded-full p-2 text-white/65 transition hover:bg-white/10 hover:text-white"
                aria-label={`Remove ${city.name} from favorites`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-white/55">
            Save a city from the weather panel to build your quick-access list.
          </p>
        )}
      </div>
    </div>
  );
}
