import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GeocodingService {
  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
  ) {}

  async getCoordinatesForLocation(
    location: string,
  ): Promise<{ lat: number; lon: number }> {
    const baseUrl = this.config.get('openWeather.geocodingUrl');
    const apiKey = this.config.get('openWeather.apiKey');
    const url = `${baseUrl}?q=${location}&limit=1&appid=${apiKey}`;
    // const [{ lat, lon }] = await firstValueFrom(this.httpService.get(url));
    const { data } = await firstValueFrom(this.httpService.get(url));
    // console.log(res);
    const coords = {
      lat: data[0].lat,
      lon: data[0].lon,
    };
    return coords;

    // return {lat,lon};
  }
}
