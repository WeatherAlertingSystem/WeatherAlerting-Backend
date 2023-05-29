import { Module } from '@nestjs/common';
import { WeatherEngineService } from './weather-engine.service';
import { HttpModule } from '@nestjs/axios';
import { GeocodingService } from './geocoding.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherTriggerModule } from 'src/weather-trigger/weather-trigger.module';
import { NotifierModule } from './notifier/notifier.module';
import { WeatherEngineTaskService } from './weather-engine-task.service';

@Module({
  imports: [HttpModule, ConfigModule, WeatherTriggerModule, NotifierModule],
  providers: [WeatherEngineService, GeocodingService, WeatherEngineTaskService],
})
export class WeatherEngineModule {}
