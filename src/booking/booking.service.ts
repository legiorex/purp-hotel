import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookingModel } from './model/booking.model';
import { Types, FilterQuery } from 'mongoose';
import { BookingCheckAvailabilityDto, CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { BookingRepository } from './booking.repository';
import { RoomRepository } from 'src/room/room.repository';
import { BOOKING_NOT_FOUND, ROOM_BOOKED, USER_NOT_FOUND } from 'src/const';
import { UserRepository } from 'src/user/user.repository';
import { TelegramService } from 'src/telegram/telegram.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly roomRepository: RoomRepository,
    private readonly userRepository: UserRepository,
    private readonly telegramService: TelegramService,
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

  async create(dto: CreateBookingDto, userEmail: string): Promise<BookingModel | null> {
    const isOverlapping = await this.checkOverlapping(dto);

    if (isOverlapping) {
      throw new HttpException(ROOM_BOOKED, HttpStatus.CONFLICT);
    }

    const room = await this.roomRepository.findById(dto.roomId);

    if (!room) {
      throw new HttpException(ROOM_BOOKED, HttpStatus.CONFLICT);
    }

    const user = await this.userRepository.getUserByEmail({ email: userEmail });

    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    const message = `New booking from ${userEmail} /n for room ${room.number} /n from ${dto.checkIn} to ${dto.checkOut}`;

    this.telegramService.sendMessage(message);

    return this.bookingRepository.create(room, user, dto);
  }

  async update(id: string, dto: UpdateBookingDto): Promise<BookingModel | null> {
    const booking = await this.bookingRepository.findById(id);

    if (!booking) {
      throw new HttpException(BOOKING_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return await this.bookingRepository.update(id, dto);
  }

  async findById(id: string): Promise<BookingModel | null> {
    const booking = await this.bookingRepository.findById(id);

    if (!booking) {
      throw new HttpException(BOOKING_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return booking;
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
