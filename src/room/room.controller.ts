import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRoomDto, FindRoomDto, UpdateRoomDto } from './dto/room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  async create(@Body() dto: CreateRoomDto) {
    return this.roomService.create(dto);
  }

  @Get('all')
  async getAll() {
    return this.roomService.findAll();
  }

  @Post('find')
  async find(@Body() dto: FindRoomDto) {
    return this.roomService.find(dto);
  }

  @Patch('update')
  async patch(@Body() dto: UpdateRoomDto) {
    return await this.roomService.update(dto);
  }

  @Get(':number')
  async get(@Param('number') number: number) {
    return await this.roomService.findByNumber(number);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.roomService.delete(id);
  }
}
