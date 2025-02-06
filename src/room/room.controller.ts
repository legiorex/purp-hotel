import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { RoomModel } from './model/room.model';
import { FindRoomDto } from './dto/find-room.dto';
import { RoomDto } from './dto/room.dto';
import { RoomService } from './room.service';
import { ROOM_EXISTS, ROOM_NOT_FOUND } from '../const';
import { Types } from 'mongoose';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  async create(@Body() dto: RoomDto) {
    return this.roomService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('all')
  async getAll() {
    return this.roomService.findAll();
  }

  @Get(':number')
  async get(@Param('number') number: number) {
    const room = await this.roomService.findByNumber(number);

    if (!room) {
      throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return room;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedRoom = await this.roomService.delete(id);
    if (!deletedRoom) {
      throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return deletedRoom;
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: RoomModel) {
    const room = await this.roomService.findByNumber(dto.number);

    if (room && !new Types.ObjectId(room.id as string).equals(id)) {
      throw new HttpException(ROOM_EXISTS, HttpStatus.CONFLICT);
    }

    const upDateRoom = await this.roomService.update(id, dto);

    if (!upDateRoom) {
      throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return upDateRoom;
  }

  @HttpCode(HttpStatus.OK)
  @Post('find')
  async find(@Body() dto: FindRoomDto) {
    return this.roomService.find(dto);
  }
}
