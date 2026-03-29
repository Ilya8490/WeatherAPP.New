export function formatTemperature(value: number) {
  return `${Math.round(value)}°C`;
}

export function formatWindSpeed(value: number) {
  return `${Math.round(value)} km/h`;
}

export function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatDay(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}
