import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GeocodingService } from './geocoding.service';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherEngineService {
  constructor(
    private readonly httpService: HttpService,
    private geocodingService: GeocodingService,
    private config: ConfigService,
  ) {
    // this.test();
  }

  async test() {
    console.log(
      // await this.geocodingService.getCoordinatesForLocation('Wroclaw'),
      await this.getWeather('Wroclaw'),
    );
  }

  async getWeather(location: string): Promise<any> {
    const apiKey = this.config.get('weatherApi.apiKey');
    const { lat, lon } = await this.geocodingService.getCoordinatesForLocation(
      location,
    );
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    return data;
  }
}
