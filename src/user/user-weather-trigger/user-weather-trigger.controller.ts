import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { Types } from 'mongoose';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { CreateWeatherTriggerDto } from 'src/weather-trigger/dto/create-weather-trigger.dto';
import {
  WeatherTrigger,
  WeatherTriggerDocument,
} from 'src/weather-trigger/schema/weather-trigger.schema';
import { WeatherTriggerService } from 'src/weather-trigger/weather-trigger.service';
import { UserService } from '../user.service';

@Roles(Role.USER)
@Controller('user/weather-trigger')
export class UserWeatherTriggerController {
  constructor(
    private weatherTriggerService: WeatherTriggerService,
    private userService: UserService,
  ) {}
  @Post()
  async createWeatherTrigger(
    @Body() createWeatherTriggerDto: CreateWeatherTriggerDto,
    @Req() request,
  ): Promise<WeatherTrigger> {
    const newTrigger = (await this.weatherTriggerService.create(
      createWeatherTriggerDto,
    )) as WeatherTriggerDocument;
    await this.userService.addSubscriptionToUser(
      newTrigger._id,
      request.payload.username,
    );
    return newTrigger;
  }

  @Delete(':id')
  async removeWeatherTrigger(
    @Param('id') id: string,
    @Req() request,
  ): Promise<WeatherTrigger> {
    this.userService.removeSubscriptionFromUser(
      new Types.ObjectId(id),
      request.payload.username,
    );
    return this.weatherTriggerService.remove(id);
  }
}
