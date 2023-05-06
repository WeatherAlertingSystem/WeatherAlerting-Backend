import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { WeatherTriggerModule } from 'src/weather-trigger/weather-trigger.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    WeatherTriggerModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
