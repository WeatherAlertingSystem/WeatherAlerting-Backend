import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GeocodingService {
  constructor(private readonly httpService: HttpService) {}

  async getCoordinatesForLocation(
    location: string,
  ): Promise<{ lat: number; lon: number }> {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=15e8f4d3ee2e9c1934dc644463f24a9d`;
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
