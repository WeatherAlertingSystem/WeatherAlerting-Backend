export interface WeatherDataItem {
  dt: number;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  weather: [
    {
      main: string;
      description: string;
    },
  ];
  clouds?: {
    all: number;
  };
  wind?: {
    speed: number;
    deg: number;
  };
  rain?: {
    '3h': number;
  };
}
