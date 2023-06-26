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
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
  @IsEmail()
  email: string;
  @IsOptional()
  @IsPhoneNumber()
  phone_number: string;
  @IsEmpty()
  subscriptions: WeatherTrigger[];
}
