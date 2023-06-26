import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true })
  username: string;
  @ExcludeProperty()
  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
