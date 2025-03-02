import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Types } from 'mongoose';
import { BookingStatus } from 'src/common/enams/booking.enam';
import { RoomModel } from 'src/room/model/room.model';

export type BookingDocument = HydratedDocument<BookingModel>;

@Schema({ timestamps: true })
export class BookingModel extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: RoomModel.name })
  roomId: Types.ObjectId;

  @Prop({ enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;

  @Prop()
  totalPrice: number;

  @Prop({ required: true })
  checkIn: Date;

  @Prop({ required: true })
  checkOut: Date;
}

export const BookingSchema = SchemaFactory.createForClass(BookingModel);
BookingSchema.index({ roomId: 1, checkIn: 1, checkOut: 1 });
