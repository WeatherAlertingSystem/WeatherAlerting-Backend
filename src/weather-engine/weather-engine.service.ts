import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { WeatherTrigger } from '../../src/weather-trigger/schema/weather-trigger.schema';
import { WeatherTriggerService } from '../../src/weather-trigger/weather-trigger.service';
import { GeocodingService } from './geocoding.service';
import { NotifierService } from './notifier/notifier.service';
import { WeatherDataItem } from './weather-data-item';
import {
  buildWeatherApiUrl,
  getValueForTriggerType,
  getWeatherItemIndexForOffset,
  isConditionFulfilled,
} from './weather-engine.utils';

@Injectable()
export class WeatherEngineService {
  private readonly logger = new Logger(WeatherEngineService.name);
  constructor(
    private readonly httpService: HttpService,
    private geocodingService: GeocodingService,
    private config: ConfigService,
    private weatherTriggerService: WeatherTriggerService,
    private notifierService: NotifierService,
  ) {
    // this.test();
  }

  async test() {
    await this.checkTriggersAndAlert();
  }

  async getWeather(location: string): Promise<any> {
    const baseUrl = this.config.get('openWeather.fiveDayWeatherForecastUrl');
    const apiKey = this.config.get('openWeather.apiKey');
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
      this.logger.debug('#####################################');
      this.logger.log(
        `Trigger: ${trigger.name}, location: ${trigger.location}`,
      );
      this.logger.debug(trigger, 'Trigger: ');
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

    this.logger.log(
      `Condition: ${trigger.condition}, Forecasted: ${forecastedValue}, Test against: ${trigger.threshold}`,
    );

    if (
      isConditionFulfilled(
        trigger.condition,
        forecastedValue,
        trigger.threshold,
      )
    ) {
      //send Notification
      this.notifierService.sendNotifications(trigger, forecastedValue);
    }
  }
}
