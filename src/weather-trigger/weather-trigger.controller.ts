import { Body, Controller, Get, Post } from '@nestjs/common';
import { WeatherTrigger } from './schema/weather-trigger.schema';
import { WeatherTriggerService } from './weather-trigger.service';
import { CreateWeatherTriggerDto } from './dto/create-weather-trigger.dto';

@Controller('weather-trigger')
export class WeatherTriggerController {
  constructor(private weatherTriggerService: WeatherTriggerService) {}
  @Get()
  async findAll(): Promise<WeatherTrigger[]> {
    return this.weatherTriggerService.findAll();
  }

  @Post()
  async create(
    @Body() weatherTriggerDto: CreateWeatherTriggerDto,
  ): Promise<WeatherTrigger> {
    return this.weatherTriggerService.create(weatherTriggerDto);
  }
}
