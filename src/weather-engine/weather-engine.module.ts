import { Module } from '@nestjs/common';
import { WeatherEngineService } from './weather-engine.service';
import { HttpModule } from '@nestjs/axios';
import { GeocodingService } from './geocoding.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherTriggerModule } from 'src/weather-trigger/weather-trigger.module';

@Module({
  imports: [HttpModule, ConfigModule, WeatherTriggerModule],
  providers: [WeatherEngineService, GeocodingService],
})
export class WeatherEngineModule {}
