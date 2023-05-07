import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GeocodingService } from './geocoding.service';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { WeatherTriggerService } from 'src/weather-trigger/weather-trigger.service';
import { WeatherDataItem } from './weather-data-item';
import { WeatherTrigger } from 'src/weather-trigger/schema/weather-trigger.schema';
import {
  buildWeatherApiUrl,
  getValueForTriggerType,
  getWeatherItemIndexForOffset,
  isConditionFulfilled,
} from './weather-engine.utils';

@Injectable()
export class WeatherEngineService {
  constructor(
    private readonly httpService: HttpService,
    private geocodingService: GeocodingService,
    private config: ConfigService,
    private weatherTriggerService: WeatherTriggerService,
  ) {
    this.test();
  }

  async test() {
    // console.log(
    //   // await this.geocodingService.getCoordinatesForLocation('Wroclaw'),
    //   // await this.getWeather('Wroclaw'),
    //   );
    await this.checkTriggersAndAlert();
  }

  async getWeather(location: string): Promise<any> {
    const baseUrl = this.config.get('weatherApi.baseUrl');
    const apiKey = this.config.get('weatherApi.apiKey');
    const { lat, lon } = await this.geocodingService.getCoordinatesForLocation(
      location,
    );
    const url = buildWeatherApiUrl(baseUrl, {
      lat,
      lon,
      apiKey,
    });

    const { data } = await firstValueFrom(this.httpService.get(url));
    return data;
  }

  async checkTriggersAndAlert(): Promise<void> {
    const allTriggers = await this.weatherTriggerService.findAll();

    for (const trigger of allTriggers) {
      // TODO: Implement caching
      console.log(trigger.name);
      const forecastList: Array<WeatherDataItem> = (
        await this.getWeather(trigger.location)
      ).list;

      const weatherItem = await this.findRelevantWeatherItem(
        trigger,
        forecastList,
      );

      this.checkAlert(trigger, weatherItem);
    }
  }

  async findRelevantWeatherItem(
    trigger: WeatherTrigger,
    forecast: Array<WeatherDataItem>,
  ): Promise<WeatherDataItem> {
    const itemIndex = getWeatherItemIndexForOffset(trigger.offset_time);
    const weatherItem = forecast[itemIndex];

    return weatherItem;
  }

  async checkAlert(trigger: WeatherTrigger, weatherItem: WeatherDataItem) {
    const forecastedValue = getValueForTriggerType(trigger.type, weatherItem);

    if (
      isConditionFulfilled(
        trigger.condition,
        forecastedValue,
        trigger.threshold,
      )
    ) {
      //send Notification
      this.sendNotifications(trigger, forecastedValue);
    }
  }

  async sendNotifications(trigger: WeatherTrigger, forecastedValue: number) {
    trigger.notification.forEach((notification) => {
      console.log(`Sending notification to ${notification.recipient}`);
      console.log(
        `Notification: Hello, in ${trigger.offset_time} in ${trigger.location} the ${trigger.type} will be ${trigger.condition} ${trigger.threshold}. Forecasted value: ${forecastedValue}`,
      );
    });
  }
}
