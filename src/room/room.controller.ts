import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateRoomDto, FindRoomDto, UpdateRoomDto } from './dto/room.dto';
import { RoomService } from './room.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enams/role.enam';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('update')
  async patch(@Body() dto: UpdateRoomDto) {
    return await this.roomService.update(dto);
  }

  @Get(':number')
  async get(@Param('number') number: number) {
    return await this.roomService.findByNumber(number);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.roomService.delete(id);
  }
}
