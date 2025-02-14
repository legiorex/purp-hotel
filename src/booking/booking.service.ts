import { Injectable } from '@nestjs/common';
import { BookingModel } from './model/booking.model';
import { Types, FilterQuery } from 'mongoose';
import { BookingCheckAvailabilityDto, CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { BookingRepository } from './booking.repository';
import { RoomRepository } from 'src/room/room.repository';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly roomRepository: RoomRepository,
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

    const result = await this.bookingRepository.findIdByFilter(filter);

    return result;
  }

  async create(dto: CreateBookingDto): Promise<BookingModel | null> {
    const isOverlapping = await this.checkOverlapping(dto);

    if (isOverlapping) {
      return null;
    }

    const room = await this.roomRepository.findById(dto.roomId);

    if (!room) {
      return null;
    }
    return this.bookingRepository.create(room, dto);
  }

  async update(id: string, dto: UpdateBookingDto): Promise<BookingModel | null> {
    const booking = await this.bookingRepository.findById(id);

    if (!booking) {
      return null;
    }

    return await this.bookingRepository.update(id, dto);
  }

  async findById(id: string): Promise<BookingModel | null> {
    return this.bookingRepository.findById(id);
  }
  async findAll(): Promise<BookingModel[]> {
    return this.bookingRepository.findAll();
  }
  async findByRoom(roomId: string): Promise<BookingModel[]> {
    return this.bookingRepository.findByRoom(roomId);
  }
  async findByRange(dto: { checkIn: Date; checkOut: Date }): Promise<BookingModel[]> {
    const checkIn = new Date(dto.checkIn);
    const checkOut = new Date(dto.checkOut);

    return this.bookingRepository.findByRange({ checkIn, checkOut });
  }
}
