import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type RoomDocument = HydratedDocument<RoomModel>;

class Image {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  name: string;
}

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

  @Prop({ type: [{ url: String, name: String }], default: [] })
  images: Image[];
}

export const RoomSchema = SchemaFactory.createForClass(RoomModel);
