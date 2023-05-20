import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateWeatherTriggerDto } from 'src/weather-trigger/dto/create-weather-trigger.dto';
import { WeatherTrigger } from 'src/weather-trigger/schema/weather-trigger.schema';
import { WeatherTriggerService } from 'src/weather-trigger/weather-trigger.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private weatherTriggerService: WeatherTriggerService,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post('create-trigger')
  async createTrigger(
    @Body() weatherTriggerDto: CreateWeatherTriggerDto,
    @Req() request: Request,
  ): Promise<WeatherTrigger> {
    const newID = await this.weatherTriggerService.create(weatherTriggerDto);
    this.userService.addSubscriptionToUser(
      newID,
      request['username']['username'],
    );
    return newID;
  }
}
