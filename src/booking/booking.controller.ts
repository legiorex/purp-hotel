import { Body, Query, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BOOKING_NOT_FOUND, ROOM_BOOKED } from 'src/const';
import { BookingRangeDto, CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('create')
  async create(@Body() dto: CreateBookingDto) {
    return await this.bookingService.create(dto);
  }

  @Get('all')
  async getAll() {
    return this.bookingService.findAll();
  }

  @Get('find-by-room')
  async findByRoom(@Query('roomId') roomId: string) {
    return this.bookingService.findByRoom(roomId);
  }

  @Get('find-by-range')
  async findByRange(@Query() query: BookingRangeDto) {
    return this.bookingService.findByRange(query);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    return await this.bookingService.update(id, dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.bookingService.findById(id);
  }
}
