import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { CreateWeatherTriggerDto } from 'src/weather-trigger/dto/create-weather-trigger.dto';
import { UpdateWeatherTriggerDto } from 'src/weather-trigger/dto/update-weather-trigger.dto';
import {
  WeatherTrigger,
  WeatherTriggerDocument,
} from 'src/weather-trigger/schema/weather-trigger.schema';
import { WeatherTriggerService } from 'src/weather-trigger/weather-trigger.service';
import { UserService } from '../user.service';

@ApiBearerAuth()
@Roles(Role.USER)
@Controller('user/weather-trigger')
export class UserWeatherTriggerController {
  constructor(
    private weatherTriggerService: WeatherTriggerService,
    private userService: UserService,
  ) {}

  @Get()
  async findAllWeatherTriggers(@Req() request): Promise<WeatherTrigger[]> {
    const userId = await this.userService.getIdByUserName(
      request.payload.username,
    );
    return this.weatherTriggerService.findBySubscriberId(userId);
  }

  @Post()
  async createWeatherTrigger(
    @Body() createWeatherTriggerDto: CreateWeatherTriggerDto,
    @Req() request,
  ): Promise<WeatherTrigger> {
    const userId = await this.userService.getIdByUserName(
      request.payload.username,
    );
    createWeatherTriggerDto.subscriberId = new Types.ObjectId(userId);
    const newTrigger = (await this.weatherTriggerService.create(
      createWeatherTriggerDto,
    )) as WeatherTriggerDocument;
    return newTrigger;
  }

  @Delete(':id')
  async removeWeatherTrigger(
    @Param('id') id: string,
    @Req() request,
  ): Promise<WeatherTrigger> {
    const userId = await this.userService.getIdByUserName(
      request.payload.username,
    );
    const userTriggers = await this.weatherTriggerService.findOne(id, userId);
    if (userTriggers === null) {
      throw new NotFoundException();
    }
    return this.weatherTriggerService.remove(id);
  }
  @Patch(':id')
  async patchWeatherTrigger(
    @Param('id') id: string,
    @Body() updateWeatherTriggerDto: UpdateWeatherTriggerDto,
    @Req() request,
  ) {
    const userId = await this.userService.getIdByUserName(
      request.payload.username,
    );
    const userTriggers = await this.weatherTriggerService.findOne(id, userId);
    if (userTriggers === null) {
      throw new NotFoundException();
    }
    return this.weatherTriggerService.update(id, updateWeatherTriggerDto);
  }
}
