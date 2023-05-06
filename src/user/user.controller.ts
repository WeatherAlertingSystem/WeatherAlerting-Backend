import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { WeatherTriggerService } from 'src/weather-trigger/weather-trigger.service';
import { CreateWeatherTriggerDto } from 'src/weather-trigger/dto/create-weather-trigger.dto';
import { WeatherTrigger } from 'src/weather-trigger/schema/weather-trigger.schema';

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

  // @Post('create-trigger')
  // async createTrigger(
  //   @Body() weatherTriggerDto: CreateWeatherTriggerDto,
  // ): Promise<WeatherTrigger> {
  //   //Create new Trigger object
  //   const newID = this.weatherTriggerService.create(weatherTriggerDto);
  //   // Add ID od new Trigger object to users subscription list
  //   this.userService.addSubscriptionToUser()
  //   return newID;
  // }
}
