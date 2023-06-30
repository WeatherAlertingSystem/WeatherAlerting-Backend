import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  name: string;

  @ApiPropertyOptional()
  description: string;

  @ApiProperty()
  location: string;

  @ApiProperty({ enum: TriggerTypes })
  @IsEnum(TriggerTypes)
  type: TriggerTypes;

  @ApiProperty()
  threshold: number;

  @ApiProperty({ enum: TriggerConditions })
  @IsEnum(TriggerConditions)
  condition: TriggerConditions;

  @ApiProperty()
  offset_time: string;

  @ApiProperty({ isArray: true })
  notification: Array<{
    channel: string;
    recipient: string;
  }>;
}
