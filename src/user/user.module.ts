import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherTriggerModule } from '../../src/weather-trigger/weather-trigger.module';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserWeatherTriggerController } from './user-weather-trigger/user-weather-trigger.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    WeatherTriggerModule,
    ConfigModule,
  ],
  controllers: [UserController, UserWeatherTriggerController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
