import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomModel } from 'src/room/model/room.model';
import { BookingModel } from 'src/booking/model/booking.model';

@Injectable()
export class StatisticRepository {
  constructor(
    @InjectModel(RoomModel.name) private readonly userModel: Model<RoomModel>,
    @InjectModel(BookingModel.name) private readonly bookingModel: Model<BookingModel>,
  ) {}

  async findAll(): Promise<BookingModel[]> {
    return this.bookingModel.find().exec();
  }
}
