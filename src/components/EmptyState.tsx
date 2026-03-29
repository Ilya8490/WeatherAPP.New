import { CloudOff } from "lucide-react";

export function EmptyState() {
  return (
    <section className="panel flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <div className="rounded-full bg-[rgb(var(--bg-soft))] p-4">
        <CloudOff className="h-8 w-8" />
      </div>
      <div className="max-w-md space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Choose a city to start</h2>
        <p className="muted text-sm">
          Search for a location above to load live conditions, forecast data, and a quick
          weather summary.
        </p>
      </div>
    </section>
  );
}
