import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';
import { WeatherTrigger } from '../../../src/weather-trigger/schema/weather-trigger.schema';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;
  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber()
  phone_number: string;
  @IsEmpty()
  subscriptions: WeatherTrigger[];
}
