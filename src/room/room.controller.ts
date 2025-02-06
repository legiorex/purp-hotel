import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { RoomModel } from './model/room.model';
import { FindRoomDto } from './dto/find-room.dto';

@Controller('room')
export class RoomController {
  @Post('create')
  async create(@Body() dto: Omit<RoomModel, '_id'>) {}

  @Get(':id')
  async get(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: RoomModel) {}

  @HttpCode(HttpStatus.OK)
  @Post('find')
  async find(@Body() dto: FindRoomDto) {}
}
