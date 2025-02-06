import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomModel, RoomSchema } from './model/room.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [RoomController],
  imports: [MongooseModule.forFeature([{ name: RoomModel.name, schema: RoomSchema }])],
})
export class RoomModule {}
