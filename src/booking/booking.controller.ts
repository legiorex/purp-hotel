import { Body, Controller, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BOOKING_NOT_FOUND, ROOM_BOOKED } from 'src/const';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('create')
  async create(@Body() dto: CreateBookingDto) {
    const booking = await this.bookingService.create(dto);
    if (!booking) {
      throw new HttpException(ROOM_BOOKED, HttpStatus.CONFLICT);
    }

    return booking;
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    const booking = await this.bookingService.update(id, dto);
    if (!booking) {
      throw new HttpException(BOOKING_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return booking;
  }
}
