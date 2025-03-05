import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomModel } from 'src/room/model/room.model';
import { BookingModel } from 'src/booking/model/booking.model';
import { StatisticByRangeDto } from './dto/statistic.dto';

@Injectable()
export class StatisticRepository {
  constructor(
    @InjectModel(RoomModel.name) private readonly roomModel: Model<RoomModel>,
    @InjectModel(BookingModel.name) private readonly bookingModel: Model<BookingModel>,
  ) {}

  async getStatisticByRange(dto: StatisticByRangeDto): Promise<BookingModel[]> {
    return await this.bookingModel
      .aggregate()
      .match({
        checkIn: { $gte: dto.start },
        checkOut: { $lte: dto.end },
      })
      .lookup({
        from: this.roomModel.collection.name,
        localField: 'roomId',
        foreignField: '_id',
        as: 'room',
      })
      .unwind('$room') // Разворачиваем массив после $lookup, избавляясь от массива room[]
      .group({
        _id: '$roomId',
        countBookingDays: {
          $sum: {
            $dateDiff: {
              startDate: '$checkIn',
              endDate: '$checkOut',
              unit: 'day',
            },
          },
        },
        roomData: { $first: '$room' }, // Берём информацию о комнате
      })
      .group({
        _id: null,
        totalBookingDays: { $sum: '$countBookingDays' }, // Общее количество бронирований
        rooms: {
          $push: {
            _id: '$_id',
            number: '$roomData.number',
            description: '$roomData.description',
            price: '$roomData.price',
            capacity: '$roomData.capacity',
            countBookingDays: '$countBookingDays',
          },
        },
      })
      .project({
        _id: 0,
        totalBookingDays: 1,
        rooms: 1,
      })
      .exec();
  }
}
