import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WeatherEngineService } from './weather-engine.service';

@Injectable()
export class WeatherEngineTaskService {
  constructor(private weatherEngineSvc: WeatherEngineService) {}
  // Run task every 3 hours starting at 23:59
  // @Cron('0 0,59 23/3 ? * * *')
  @Cron('* * * * *')
  async runWeatherEngineTask(): Promise<void> {
    console.log('Running task');
    this.weatherEngineSvc.checkTriggersAndAlert();
    return;
  }
}
