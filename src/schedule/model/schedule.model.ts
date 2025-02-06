import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Types } from 'mongoose';

export type ScheduleDocument = HydratedDocument<ScheduleModel>;

class BookedRoom {
  @Prop()
  roomId: Types.ObjectId;

  @Prop()
  room: number;

  @Prop()
  bookedBy: string;

  @Prop()
  bookedFor: string;

  @Prop()
  isPaid: boolean;
}

@Schema({ timestamps: true })
export class ScheduleModel extends Document {
  @Prop({ unique: true, required: true })
  date: Date;

  @Prop({ type: [Number], default: [] })
  availableRooms: number[];

  @Prop({ type: [BookedRoom], default: [], _id: false })
  bookedRooms: BookedRoom[];
}

export const ScheduleSchema = SchemaFactory.createForClass(ScheduleModel);
