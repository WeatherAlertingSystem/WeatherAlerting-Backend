import { Module } from '@nestjs/common';
import { WeatherEngineService } from './weather-engine.service';
import { HttpModule } from '@nestjs/axios';
import { GeocodingService } from './geocoding.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [WeatherEngineService, GeocodingService],
})
export class WeatherEngineModule {}
