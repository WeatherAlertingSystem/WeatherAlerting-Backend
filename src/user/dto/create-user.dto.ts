import { WeatherTrigger } from 'src/weather-trigger/schema/weather-trigger.schema';
export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  phone_number: string;
  subscriptions: WeatherTrigger[];
}
