import { TriggerConditions } from '../../src/weather-trigger/models/weather-trigger-conditions.enum';
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
  const x = {
    [TriggerConditions.GTE]: (a: number, b: number) => {
      return a >= b;
    },
    [TriggerConditions.GT]: (a: number, b: number) => {
      return a > b;
    },
    [TriggerConditions.LTE]: (a: number, b: number) => {
      return a <= b;
    },
    [TriggerConditions.LT]: (a: number, b: number) => {
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
