import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ScheduleModel } from './schedule.model';

@Controller('schedule')
export class ScheduleController {
  @Post('create')
  async create(@Body() dto: Omit<ScheduleModel, '_id'>) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Get(':id')
  async get(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ScheduleModel) {}

  @HttpCode(HttpStatus.OK)
  @Post('find')
  async find(@Body() date: Date) {}
}
