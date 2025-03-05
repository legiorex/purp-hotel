import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingModel, BookingSchema } from './model/booking.model';
import { RoomModel, RoomSchema } from 'src/room/model/room.model';
import { BookingRepository } from './booking.repository';
import { RoomRepository } from 'src/room/room.repository';
import { UserRepository } from 'src/user/user.repository';
import { UserModel, UserSchema } from 'src/user/model/user.model';

@Module({
  providers: [BookingService, BookingRepository, RoomRepository, UserRepository],
  controllers: [BookingController],
  imports: [
    MongooseModule.forFeature([
      { name: BookingModel.name, schema: BookingSchema },
      { name: RoomModel.name, schema: RoomSchema },
      { name: UserModel.name, schema: UserSchema },
    ]),
  ],
})
export class BookingModule {}
