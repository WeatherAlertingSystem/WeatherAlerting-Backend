import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { CreateWeatherTriggerDto } from './dto/create-weather-trigger.dto';
import { WeatherTrigger } from './schema/weather-trigger.schema';
import { WeatherTriggerService } from './weather-trigger.service';

@Controller('weather-trigger')
export class WeatherTriggerController {
  constructor(private weatherTriggerService: WeatherTriggerService) {}

  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<WeatherTrigger[]> {
    return this.weatherTriggerService.findAll();
  }

  @Roles(Role.ADMIN)
  @Post()
  async create(
    @Body() weatherTriggerDto: CreateWeatherTriggerDto,
  ): Promise<WeatherTrigger> {
    return this.weatherTriggerService.create(weatherTriggerDto);
  }
}
