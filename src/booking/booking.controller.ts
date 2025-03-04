import { Body, Query, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingRangeDto, CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { EmailUser } from 'src/common/decorators/email-user.decorator';
import { UserModel } from 'src/user/model/user.model';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @EmailUser()
    user: Pick<UserModel, 'email' | 'role'>,
    @Body() dto: CreateBookingDto,
  ) {
    return await this.bookingService.create(dto, user.email);
  }

  @UseGuards(JwtAuthGuard)
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
