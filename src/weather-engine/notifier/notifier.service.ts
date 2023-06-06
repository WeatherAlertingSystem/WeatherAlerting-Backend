import { Injectable, Logger } from '@nestjs/common';
import { WeatherTrigger } from 'src/weather-trigger/schema/weather-trigger.schema';

@Injectable()
export class NotifierService {
  private readonly logger = new Logger(NotifierService.name);
  async sendNotifications(trigger: WeatherTrigger, forecastedValue: number) {
    trigger.notification.forEach((notification) => {
      this.logger.log(`Sending notification to ${notification.recipient}`);
      this.logger.log(
        `Notification: Hello, in ${trigger.offset_time} in ${trigger.location} the ${trigger.type} will be ${trigger.condition} ${trigger.threshold}. Forecasted value: ${forecastedValue}`,
      );
    });
  }
}
