import { Injectable } from '@nestjs/common';
import { WeatherTrigger } from 'src/weather-trigger/schema/weather-trigger.schema';

@Injectable()
export class NotifierService {
  async sendNotifications(trigger: WeatherTrigger, forecastedValue: number) {
    trigger.notification.forEach((notification) => {
      console.log(`Sending notification to ${notification.recipient}`);
      console.log(
        `Notification: Hello, in ${trigger.offset_time} in ${trigger.location} the ${trigger.type} will be ${trigger.condition} ${trigger.threshold}. Forecasted value: ${forecastedValue}`,
      );
    });
  }
}
