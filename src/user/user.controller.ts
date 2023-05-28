import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/role.enum';
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

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
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
