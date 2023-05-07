import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class WeatherNotification {
  @Prop()
  channel: string;

  @Prop()
  recipient: string;
}
export const WeatherNotificationSchema =
  SchemaFactory.createForClass(WeatherNotification);
