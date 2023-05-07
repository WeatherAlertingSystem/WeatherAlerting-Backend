import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class WeatherEngineTaskService {
  // Run task every 3 hours starting at 23:59
  @Cron('0 0,59 23/3 ? * * *')
  async runWeatherEngineTask(): Promise<void> {
    console.log('Running task');
    return;
  }
}
