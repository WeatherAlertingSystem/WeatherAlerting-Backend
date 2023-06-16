import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationChannels } from 'src/weather-trigger/schema/weather-notification.schema';
import { WeatherTrigger } from '../../../src/weather-trigger/schema/weather-trigger.schema';

@Injectable()
export class NotifierService {
  private readonly logger = new Logger(NotifierService.name);

  constructor(
    private readonly mailerService: MailerService,
    private config: ConfigService,
  ) {}
  async sendNotifications(trigger: WeatherTrigger, forecastedValue: number) {
    trigger.notification.forEach((notification) => {
      this.logger.log(`Sending notification to ${notification.recipient}`);
      this.logger.log(
        `Notification: Hello, in ${trigger.offset_time} in ${trigger.location} the ${trigger.type} will be ${trigger.condition} ${trigger.threshold}. Forecasted value: ${forecastedValue}`,
      );

      if (
        this.config.get('mailing.sendEmails') &&
        notification.channel === NotificationChannels.EMAIL
      ) {
        this.mailerService
          .sendMail({
            to: notification.recipient,
            subject: `Trigger "${trigger.name}" notification`,
            html: `<h2>Hello, in ${trigger.offset_time} in ${trigger.location} the ${trigger.type} will be ${trigger.condition} ${trigger.threshold}. Forecasted value: ${forecastedValue}</h2>`,
          })
          .then(() => {
            this.logger.debug(
              `Email sent succesfully to ${notification.recipient}.`,
              'mailer',
            );
          })
          .catch((error) => {
            this.logger.warn(
              `Failure during sending an email to ${notification.recipient}.` +
                error,
              'mailer',
            );
          });
      }
    });
  }
}
