declare const process: {
  env: Record<string, string | undefined>;
};

type QueryValue = string | string[] | undefined;

interface VercelRequest {
  method?: string;
  query: Record<string, QueryValue>;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
}

const WEATHER_API_BASE_URL = "https://api.weatherapi.com/v1";

function getSingleQueryValue(value: QueryValue) {
  return Array.isArray(value) ? value[0] : value;
}

function getApiKey() {
  return process.env.WEATHER_API_KEY ?? process.env.VITE_WEATHER_API_KEY;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = getApiKey();

  if (!apiKey) {
    return res.status(500).json({
      error: "Missing WeatherAPI key. Add WEATHER_API_KEY or VITE_WEATHER_API_KEY to your server environment.",
    });
  }

  const endpoint = getSingleQueryValue(req.query.endpoint);
  const city = getSingleQueryValue(req.query.q);
  const date = getSingleQueryValue(req.query.dt);

  if (!endpoint || !city) {
    return res.status(400).json({ error: "Missing required query parameters." });
  }

  const params = new URLSearchParams({
    key: apiKey,
    q: city,
  });

  if (endpoint === "forecast.json") {
    params.set("days", "3");
    params.set("aqi", "no");
    params.set("alerts", "no");
  }

  if (endpoint === "history.json" && date) {
    params.set("dt", date);
  }

  const response = await fetch(`${WEATHER_API_BASE_URL}/${endpoint}?${params.toString()}`);
  const data = (await response.json()) as unknown;

  if (!response.ok) {
    return res.status(response.status).json(data);
  }

  return res.status(200).json(data);
}
