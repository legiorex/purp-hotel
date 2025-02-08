import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingModel, BookingSchema } from './model/booking.model';
import { RoomModel, RoomSchema } from 'src/room/model/room.model';

@Module({
  providers: [BookingService],
  controllers: [BookingController],
  imports: [
    MongooseModule.forFeature([
      { name: BookingModel.name, schema: BookingSchema },
      { name: RoomModel.name, schema: RoomSchema },
    ]),
  ],
})
export class BookingModule {}
