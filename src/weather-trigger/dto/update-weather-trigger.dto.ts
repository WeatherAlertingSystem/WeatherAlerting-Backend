import { IsAlphanumeric, IsEnum, IsOptional } from 'class-validator';
import { TriggerConditions } from '../models/weather-trigger-conditions.enum';
import { TriggerTypes } from '../models/weather-trigger-types.enum';

export class UpdateWeatherTriggerDto {
  @IsOptional()
  @IsAlphanumeric()
  name: string;
  description: string;
  location: string;
  @IsOptional()
  @IsEnum(TriggerTypes)
  type: TriggerTypes;
  threshold: number;
  @IsOptional()
  @IsEnum(TriggerConditions)
  condition: TriggerConditions;
  offset_time: string;
  notification: Array<{
    channel: string;
    recipient: string;
  }>;
}
