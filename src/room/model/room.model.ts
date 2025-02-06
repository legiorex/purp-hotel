import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type RoomDocument = HydratedDocument<RoomModel>;

@Schema({ timestamps: true })
export class RoomModel extends Document {
  @Prop({ unique: true, required: true })
  number: number;

  @Prop()
  description: string;

  @Prop()
  capacity: number;

  @Prop()
  price: number;
}

export const RoomSchema = SchemaFactory.createForClass(RoomModel);
