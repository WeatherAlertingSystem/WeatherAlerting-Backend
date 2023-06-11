import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherTriggerModule } from '../../src/weather-trigger/weather-trigger.module';
import { GeocodingService } from './geocoding.service';
import { NotifierModule } from './notifier/notifier.module';
import { WeatherEngineTaskService } from './weather-engine-task.service';
import { WeatherEngineService } from './weather-engine.service';

@Module({
  imports: [HttpModule, ConfigModule, WeatherTriggerModule, NotifierModule],
  providers: [WeatherEngineService, GeocodingService, WeatherEngineTaskService],
})
export class WeatherEngineModule {}
