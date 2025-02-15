import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsInt, IsString } from 'class-validator';

export class RoomDto {
  @IsString()
  id: string;

  @IsInt()
  number: number;

  @IsInt()
  capacity: number;

  @IsInt()
  price: number;

  @IsString()
  description: string;
}

export class CreateRoomDto extends OmitType(RoomDto, ['id']) {}
export class UpdateRoomDto extends PartialType(RoomDto) {}
export class FindRoomDto extends PartialType(PickType(RoomDto, ['price', 'capacity'])) {}
