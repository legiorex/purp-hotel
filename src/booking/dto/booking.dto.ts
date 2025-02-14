import { IsString, IsInt, IsDateString, IsEnum } from 'class-validator';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { BookingStatus } from 'src/common/enams/booking.enams';

export class BookingDto {
  @IsString()
  id: string;

  @IsString()
  roomId: string;

  @IsEnum(BookingStatus)
  status: BookingStatus;

  @IsInt()
  totalPrice: number;

  @IsDateString()
  checkIn: Date;

  @IsDateString()
  checkOut: Date;
}
export class UpdateBookingDto extends PartialType(BookingDto) {}

export class BookingRangeDto extends PickType(BookingDto, ['checkIn', 'checkOut'] as const) {}

export class BookingCheckAvailabilityDto extends PickType(BookingDto, ['roomId', 'checkIn', 'checkOut'] as const) {}

export class CreateBookingDto extends PickType(BookingDto, ['roomId', 'checkIn', 'checkOut'] as const) {}
