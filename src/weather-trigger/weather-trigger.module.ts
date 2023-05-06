import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WeatherTrigger,
  WeatherTriggerSchema,
} from './schema/weather-trigger.schema';
import { WeatherTriggerController } from './weather-trigger.controller';
import { WeatherTriggerService } from './weather-trigger.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WeatherTrigger.name, schema: WeatherTriggerSchema },
    ]),
  ],
  controllers: [WeatherTriggerController],
  providers: [WeatherTriggerService],
  exports: [WeatherTriggerService],
})
export class WeatherTriggerModule {}
