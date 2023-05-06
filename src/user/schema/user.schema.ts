import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { WeatherTrigger } from 'src/weather-trigger/schema/weather-trigger.schema';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  phone_number: string;

  @Prop({
    required: false,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WeatherTrigger' }],
  })
  subscriptions: WeatherTrigger[];
}

export const UserSchema = SchemaFactory.createForClass(User);
