import { WeatherTrigger } from 'src/weather-trigger/schema/weather-trigger.schema';
import { WeatherDataItem } from './weather-data-item';

export function buildWeatherApiUrl(baseUrl: string, params: any): string {
  const url = new URL(baseUrl);
  url.searchParams.append('lat', params.lat.toString());
  url.searchParams.append('lon', params.lon.toString());
  url.searchParams.append('appid', params.apiKey);
  url.searchParams.append('units', 'metric');
  return url.href;
}

export function isConditionFulfilled(
  cond: string,
  a: number,
  b: number,
): boolean {
  console.log(cond, a, b);
  const x = {
    gte: (a: number, b: number) => {
      return a >= b;
    },
    gt: (a: number, b: number) => {
      return a > b;
    },
    lte: (a: number, b: number) => {
      return a <= b;
    },
    lt: (a: number, b: number) => {
      return a < b;
    },
  };
  return x[cond](a, b);
}

export function getValueForTriggerType(
  triggerType: string,
  weatherItem: WeatherDataItem,
) {
  const mapping = {
    temperature: () => {
      return weatherItem.main.temp;
    },
    humidity: () => {
      return weatherItem.main.humidity;
    },
  };
  return mapping[triggerType]();
}

export function getWeatherItemIndexForOffset(offsetTime: string): number {
  return Math.floor(getHours(offsetTime) / 3);
}

export function getHours(offsetTime: string) {
  const timeUnit = offsetTime[-1];
  // TODO: Optionally add other timeUnits handling
  if (timeUnit === 'h') {
    return Number(offsetTime.slice(0, -1));
  }
  return 0;
}
