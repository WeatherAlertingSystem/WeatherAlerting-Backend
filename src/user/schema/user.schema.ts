import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @ExcludeProperty()
  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  phone_number: string;

  // @Prop({
  //   required: false,
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WeatherTrigger' }],
  // })
  // subscriptions: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
