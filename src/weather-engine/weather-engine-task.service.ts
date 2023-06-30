import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { WeatherEngineService } from './weather-engine.service';

@Injectable()
export class WeatherEngineTaskService {
  private readonly logger = new Logger(WeatherEngineService.name);
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private weatherEngineSvc: WeatherEngineService,
    private readonly config: ConfigService,
  ) {
    this.addCronJob();
  }

  async runWeatherEngineTask(): Promise<void> {
    this.logger.log('Running Weather Engine Task');
    this.weatherEngineSvc.checkTriggersAndAlert();
    return;
  }

  addCronJob() {
    this.logger.debug(
      `Adding WeatherEngine cron job: ${this.config.get('cronConfig')}`,
    );
    const job = new CronJob(this.config.get('cronConfig'), () => {
      this.runWeatherEngineTask();
    });

    this.schedulerRegistry.addCronJob('WeatherEngineJob', job);
    job.start();
  }
}
