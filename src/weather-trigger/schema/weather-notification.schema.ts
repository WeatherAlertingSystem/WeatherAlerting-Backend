import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum NotificationChannels {
  EMAIL = 'email',
  SMS = 'sms',
}

@Schema()
export class WeatherNotification {
  @Prop()
  channel: NotificationChannels;

  @Prop()
  recipient: string;
}
export const WeatherNotificationSchema =
  SchemaFactory.createForClass(WeatherNotification);
