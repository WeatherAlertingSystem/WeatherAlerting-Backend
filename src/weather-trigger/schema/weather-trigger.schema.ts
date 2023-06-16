import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { TriggerConditions } from '../models/weather-trigger-conditions.enum';
import { TriggerTypes } from '../models/weather-trigger-types.enum';
import {
  WeatherNotification,
  WeatherNotificationSchema,
} from './weather-notification.schema';

export type WeatherTriggerDocument = HydratedDocument<WeatherTrigger>;

@Schema({ timestamps: true })
export class WeatherTrigger {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  subscriberId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true, enum: TriggerTypes })
  type: string;

  @Prop({ required: true })
  threshold: number;

  @Prop({ required: true, enum: TriggerConditions })
  condition: string;

  @Prop({ required: true })
  offset_time: string;

  @Prop({ schema: WeatherNotificationSchema })
  notification: WeatherNotification[];
}

export const WeatherTriggerSchema =
  SchemaFactory.createForClass(WeatherTrigger);
