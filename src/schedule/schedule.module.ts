import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModel, ScheduleSchema } from './model/schedule.model';

@Module({
  controllers: [ScheduleController],
  imports: [MongooseModule.forFeature([{ name: ScheduleModel.name, schema: ScheduleSchema }])],
})
export class ScheduleModule {}
