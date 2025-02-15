import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomModel, RoomSchema } from './model/room.model';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from './room.service';
import { RoomRepository } from './room.repository';

@Module({
  controllers: [RoomController],
  imports: [MongooseModule.forFeature([{ name: RoomModel.name, schema: RoomSchema }])],
  providers: [RoomService, RoomRepository],
  exports: [MongooseModule],
})
export class RoomModule {}
