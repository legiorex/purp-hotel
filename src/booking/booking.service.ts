import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookingModel } from './model/booking.model';
import { Model, Types, FilterQuery } from 'mongoose';
import { BookingCheckAvailabilityDto, CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { RoomModel } from 'src/room/model/room.model';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(BookingModel.name) private readonly bookingModel: Model<BookingModel>,
    @InjectModel(RoomModel.name) private readonly roomModel: Model<RoomModel>,
  ) {}

  private async checkOverlapping(dto: BookingCheckAvailabilityDto): Promise<{ _id: Types.ObjectId } | null> {
    const roomId = new Types.ObjectId(dto.roomId);
    const checkIn = new Date(dto.checkIn);
    const checkOut = new Date(dto.checkOut);

    const filter: FilterQuery<BookingModel> = {
      roomId,
      status: { $ne: 'cancelled' },
      checkIn: { $lt: checkOut },
      checkOut: { $gt: checkIn },
    };

    const result = await this.bookingModel.exists(filter);

    return result as { _id: Types.ObjectId } | null;
  }

  async create(dto: CreateBookingDto): Promise<BookingModel | null> {
    const isOverlapping = await this.checkOverlapping(dto);

    if (isOverlapping) {
      return null;
    }

    const room = await this.roomModel.findById(dto.roomId).exec();

    if (!room) {
      return null;
    }
    return this.bookingModel.create({ ...dto, roomId: room._id });
  }

  async update(id: string, dto: UpdateBookingDto): Promise<BookingModel | null> {
    const booking = await this.bookingModel.findById(id);

    if (!booking) {
      return null;
    }

    return await this.bookingModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
