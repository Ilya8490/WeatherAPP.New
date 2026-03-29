export function normalizeWeatherIcon(iconPath: string) {
  if (!iconPath) {
    return "";
  }

  return iconPath.startsWith("//") ? `https:${iconPath}` : iconPath;
}
