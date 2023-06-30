import {
  IsAlphanumeric,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';
import { TriggerConditions } from '../models/weather-trigger-conditions.enum';
import { TriggerTypes } from '../models/weather-trigger-types.enum';

export class CreateWeatherTriggerDto {
  @IsOptional()
  @IsMongoId()
  subscriberId: Types.ObjectId;
  @IsNotEmpty()
  @IsAlphanumeric()
  name: string;
  description: string;
  location: string;
  @IsEnum(TriggerTypes)
  type: TriggerTypes;
  threshold: number;
  @IsEnum(TriggerConditions)
  condition: TriggerConditions;
  offset_time: string;
  notification: Array<{
    channel: string;
    recipient: string;
  }>;
}
