export interface CitySearchResult {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export interface FavoriteCity {
  id: string;
  name: string;
  region: string;
  country: string;
}

export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  localtime: string;
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface CurrentWeather {
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
  is_day: number;
  condition: WeatherCondition;
  last_updated: string;
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    avghumidity: number;
    daily_chance_of_rain: number;
    condition: WeatherCondition;
  };
  hour: ForecastHour[];
}

export interface ForecastHour {
  time: string;
  temp_c: number;
  feelslike_c: number;
  chance_of_rain: number;
  condition: WeatherCondition;
  wind_kph: number;
}

export interface WeatherResponse {
  location: WeatherLocation;
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
}
