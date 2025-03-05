import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StatisticRepository } from './statistic.repository';
import { BookingModel, BookingSchema } from 'src/booking/model/booking.model';
import { RoomModel, RoomSchema } from 'src/room/model/room.model';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService, StatisticRepository],
  exports: [MongooseModule],
  imports: [
    MongooseModule.forFeature([
      { name: BookingModel.name, schema: BookingSchema },
      { name: RoomModel.name, schema: RoomSchema },
    ]),
  ],
})
export class StatisticModule {}
